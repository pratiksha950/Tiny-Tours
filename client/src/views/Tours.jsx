import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"


function Tours() {
    useEffect(()=>{
        setPageTitle("Tours-TinyTour")
    },[])
    
  return (
    <div>Tours</div>
  )
}

export default Tours