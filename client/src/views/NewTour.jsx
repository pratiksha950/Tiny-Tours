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
            const response = await fetch("http://localhost:8080/auth");
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
      const response=await axios.post("http://localhost:8080/tours",newTour,{
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

    useEffect(()=>{
        setPageTitle("NewTour-TinyTour")
    },[])

         const handleUpload = async () => {
        // Access the file input element using the ref
        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            alert("Please select a file to upload");
            return;
        }

        // Extract the first file from the file input
        const file = fileInput.files[0];

        // Retrieve authentication parameters for the upload.
        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }
        const { signature, expire, token, publicKey } = authParams;

        // Call the ImageKit SDK upload function with the required parameters and callbacks.
        try {
            const uploadResponse = await upload({
                // Authentication parameters
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
              
            });
            setNewTour({
              ...newTour,
              photos:[...newTour.photos,uploadResponse.url]
            })
            console.log("Upload response:", uploadResponse);

        } catch (error) {
            // Handle specific error types provided by the ImageKit SDK.
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                // Handle any other errors that may occur.
                console.error("Upload error:", error);
            }
        }
    };


  return (
    <div>
      <Navbar />
      <h1>Add New Tour</h1>

      <div className="w-75 block mx-auto mt-10 ">

      <Input type={"text"}
      placeholder={"Enter Title"} 
      value={newTour.title}
      onChange={(e)=>{
        setNewTour({
          ...newTour,
          title:e.target.value,
        })
      }}
      />


      <Input type={"text"} 
      placeholder={"Enter Description"}
      value={newTour.Description}
      onChange={(e)=>{
        setNewTour({
          ...newTour,
          Description:e.target.value,
        })
      }}
      />

      <MultiSelect selectedItems={newTour.cities} 
      placeholder={"Enter city"}
      onAddItem={(val)=>{
                   setNewTour({
            ...newTour,
            cities:[...newTour.cities,val]
          })
      }}
      onRemoveItem={(val)=>{
        setNewTour({
          ...newTour,
          cities:newTour.cities.filter((city)=>city!==val)
        })
      }}
      />

            <Input type={"date"} 
      placeholder={"Enter startDate"}
      value={newTour.startDate}
      onChange={(e)=>{
        setNewTour({
          ...newTour,
          startDate:e.target.value,
        })
      }}
      />

      <Input type={"date"} 
      placeholder={"Enter endDate"}
      value={newTour.endDate}
      onChange={(e)=>{
        setNewTour({
          ...newTour,
          endDate:e.target.value,
        })
      }}
      />
      {newTour.photos?.map((photo,index)=>(
        <img key={index}
         src={photo}
          alt={`tour-photo ${index+1}`} 
          className="h-20 w-20 mr-2 object-cover"/>
      ))}

      <input type="file" ref={fileInputRef} onChange={(e)=>{
        if (e.target.files.length > 0) {
          handleUpload();
        }
      }}/>
      {progress}%

      </div>

      <div>
        <Button title="add tour" onClick={addTour}  varient="primary"/>
      </div>
      <Toaster />
      </div>
  )
}

export default NewTour