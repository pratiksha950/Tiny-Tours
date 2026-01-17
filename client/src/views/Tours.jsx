import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"
import Navbar from '../components/Navbar'

function Tours() {
    useEffect(()=>{
        setPageTitle("Tours-TinyTour")
    },[])
    
  return (
    <div>
      <Navbar />
      Tours</div>
  )
}

export default Tours