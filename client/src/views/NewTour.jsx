import {useEffect,useState,useRef} from "react"
import {setPageTitle} from "../utils.jsx"
import Navbar from '../components/Navbar'
import Input from "../components/Input.jsx";
import MultiSelect from "../components/MultiSelect.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import {getUserJwtToken} from "../utils.jsx"
import { useNavigate } from "react-router-dom";
import PhotoViewer from "../components/PhotoViewer.jsx";
import img from "../assets/tour.png"

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/react";


     const authenticator = async () => {
        try {
            // Perform the request to the upload authentication endpoint.
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth`);
            if (!response.ok) {
                // If the server response is not successful, extract the error text for debugging.
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            // Parse and destructure the response JSON for upload credentials.
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            // Log the original error for debugging before rethrowing a new error.
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };



function NewTour() {
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null); 

  const navigate = useNavigate();

      const [newTour,setNewTour]=useState({
        title:"",
        Description:"",
        cities:[],
        startDate:"",
        endDate:"",
        photos:[]

    });

    const addTour=async()=>{
      const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/tours`,newTour,{
        headers:{
        Authorization:`Bearer ${getUserJwtToken()}`
      }
      });
      console.log(response.data);
      if(response.data.success){
        toast.success(response.data.message)
        navigate("/dashboard"); 
      }else{
        toast.error(response.data.message)
      }
    }

useEffect(() => {
  if (!getUserJwtToken()) {
    toast.error("Please login first!");
    navigate("/login");
  }
}, []);

         const handleUpload = async () => {
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        const file = fileInput.files[0];

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, 
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
              
            });
            setNewTour({
              ...newTour,
              photos:[...newTour.photos,uploadResponse.url]
            })
            setProgress(0);
            fileInput.value="";
            console.log("Upload response:", uploadResponse);

        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }
    };


  return (
    <>
    <Navbar />

<div className="my-10 px-4">
  <h1 className="text-3xl font-bold text-center text-gray-800">
    Add New Tour
  </h1>

    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
  <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 h-[500px]">

    <div className="hidden md:block">
      <img
        src={img}
        alt="Tour"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Tour
      </h1>

      <div className="space-y-4">

        <Input
          type="text"
          placeholder="Enter Title"
          value={newTour.title}
          onChange={(e) =>
            setNewTour({ ...newTour, title: e.target.value })
          }
        />

        <Input
          type="text"
          placeholder="Enter Description"
          value={newTour.Description}
          onChange={(e) =>
            setNewTour({ ...newTour, Description: e.target.value })
          }
        />

        <MultiSelect
          selectedItems={newTour.cities}
          placeholder="Enter city"
          onAddItem={(val) =>
            setNewTour({ ...newTour, cities: [...newTour.cities, val] })
          }
          onRemoveItem={(val) =>
            setNewTour({
              ...newTour,
              cities: newTour.cities.filter((c) => c !== val),
            })
          }
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            type="date"
            value={newTour.startDate}
            onChange={(e) =>
              setNewTour({ ...newTour, startDate: e.target.value })
            }
          />
          <Input
            type="date"
            value={newTour.endDate}
            onChange={(e) =>
              setNewTour({ ...newTour, endDate: e.target.value })
            }
          />
        </div>

        {/* Uploaded Photos Preview */}
        <div className="flex gap-3 flex-wrap">
          {newTour.photos?.map((photo, index) => (
            <PhotoViewer
              key={index}
              imgUrl={photo}
              index={index}
              showDelete
              onDelete={(i) =>
                setNewTour((prev) => ({
                  ...prev,
                  photos: prev.photos.filter((_, idx) => idx !== i),
                }))
              }
            />
          ))}
        </div>

        {/* File Upload */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleUpload}
          className="w-full border p-2 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
        />

        {progress > 0 && (
          <p className="text-blue-600 font-semibold">
            Uploading {progress.toFixed(0)}%
          </p>
        )}

        <Button title="Add Tour" onClick={addTour} varient="primary" />
      </div>
    </div>
  </div>

  <Toaster />
</div>
  <Toaster />
</div>
      </>
  )
}

export default NewTour