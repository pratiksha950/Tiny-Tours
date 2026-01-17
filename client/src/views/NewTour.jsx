import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"
import Navbar from '../components/Navbar'

function NewTour() {
    useEffect(()=>{
        setPageTitle("NewTour-TinyTour")
    },[])

  return (
    <div>
      <Navbar />
      NewTour</div>
  )
}

export default NewTour