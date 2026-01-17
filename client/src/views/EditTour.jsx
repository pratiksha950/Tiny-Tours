import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"
import Navbar from '../components/Navbar'

function EditTour() {
    useEffect(()=>{
        setPageTitle("Edit Tour-TinyTour");
    },[])
  return (
    <div>
       <Navbar />
      EditTour
      </div>
  )
}

export default EditTour