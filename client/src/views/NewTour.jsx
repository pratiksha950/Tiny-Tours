import {useEffect,useState} from "react"
import {setPageTitle} from "../utils.jsx"
import Navbar from '../components/Navbar'
import Input from "../components/Input.jsx";


function NewTour() {
      const [newTour,setNewTour]=useState({
        title:"",
        description:"",
        cities:[],
        startDate:"",
        endDate:"",
        photos:[]

    });

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
      value={newTour.description}
      onChange={(e)=>{
        setNewTour({
          ...NewTour,
          description:e.target.value,
        })
      }}
      
      />
      </div>

      </div>
  )
}

export default NewTour