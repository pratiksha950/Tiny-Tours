import {useEffect,useState} from "react"
import {setPageTitle} from "../utils.jsx"
import Navbar from '../components/Navbar'
import Input from "../components/Input.jsx";
import MultiSelect from "../components/MultiSelect.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import {getUserJwtToken} from "../utils.jsx"
import { useNavigate } from "react-router-dom";


function NewTour() {
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

      </div>

      <div>
        <Button title="add tour" onClick={addTour}  varient="primary"/>
      </div>
      <Toaster />
      </div>
  )
}

export default NewTour