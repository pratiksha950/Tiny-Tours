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
import { useParams } from "react-router-dom";

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

    
function EditTour() {
   const {id}=useParams();

  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef(null); 

  const navigate = useNavigate();

      const [existingTour,setExistingTour]=useState({
        title:"",
        Description:"",
        cities:[],
        startDate:"",
        endDate:"",
        photos:[]

    });

    const EditTour=async()=>{
      const response=await axios.put(`${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,existingTour,{
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

    const loadExistingTour=async()=>{
      const response=await axios.get (
     `${import.meta.env.VITE_API_BASE_URL}/tours/${id}`,
      {
        headers:{
        Authorization:`Bearer ${getUserJwtToken()}`
        }
      }
    )
      console.log(response.data);

if (response.data.success) {
  setExistingTour({
    ...response.data.data,
    startDate: response.data.data.startDate.split("T")[0],
    endDate: response.data.data.endDate.split("T")[0],
  });
} else {
  toast.error(response.data.message);
}

    }

useEffect(()=>{
      loadExistingTour()  
    },[id])
      

    useEffect(()=>{
        setPageTitle("EditTour-TinyTour")
    },[])

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
                fileName: file.name, // Optionally set a custom file name
                // Progress callback to update upload progress state
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                // Abort signal to allow cancellation of the upload if needed.
              
            });
            setExistingTour({
              ...existingTour,
              photos:[...existingTour.photos,uploadResponse.url]
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
    <div className="my-25">
      <h1 className="align-item-center justify-center text-xl font-bold">Edit Tour </h1>

      <div className="w-75 block  mt-10 ">

      <Input type={"text"}
      placeholder={"Enter Title"} 
      value={existingTour.title}
      onChange={(e)=>{
        setExistingTour({
          ...existingTour,
          title:e.target.value,
        })
      }}
      />


      <Input type={"text"} 
      placeholder={"Enter Description"}
      value={existingTour.Description}
      onChange={(e)=>{
        setExistingTour({
          ...existingTour,
          Description:e.target.value,
        })
      }}
      />

      <MultiSelect selectedItems={existingTour.cities} 
      placeholder={"Enter city"}
      onAddItem={(val)=>{
        
                   setExistingTour({
            ...existingTour,
            cities:[...existingTour.cities,val]
          })
      }}
      onRemoveItem={(val)=>{
        setExistingTour({
          ...existingTour,
          cities:existingTour.cities.filter((city)=>city!==val)
        })
      }}
      />

            <Input type={"date"} 
      placeholder={"Enter startDate"}
      value={existingTour.startDate}
      onChange={(e)=>{
        setExistingTour({
          ...existingTour,
          startDate:e.target.value,
        })
      }}
      />

      <Input type={"date"} 
      placeholder={"Enter endDate"}
      value={existingTour.endDate}
      onChange={(e)=>{
        setExistingTour({
          ...existingTour,
          endDate:e.target.value,
        })
      }}
      />
      <div className="flex gap-x-4 flex-wrap">
{existingTour.photos?.map((photo, index) => (
  <PhotoViewer
    key={index}
    imgUrl={photo}
    index={index}
    showDelete
    onDelete={(deleteIndex) => {
      setExistingTour(prev => ({
        ...prev,
        photos: prev.photos.filter((_, i) => i !== deleteIndex)
      }));
    }}
  />
))}
</div>

      <input type="file" ref={fileInputRef} onChange={(e)=>{
        if (e.target.files.length > 0) {
          handleUpload();
        }
      }}/>
      {progress>0 ? `Uploading ${progress}%` :null}
      

      </div>

      <div className="w-75 block mx-auto mt-10 ">
        <Button title="Edit tour" onClick={EditTour}  varient="primary"/>
      </div>
      <Toaster />
      </div>
      </>
  )
}

export default EditTour