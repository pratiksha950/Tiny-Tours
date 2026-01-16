import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"



function NewTour() {
    useEffect(()=>{
        setPageTitle("NewTour-TinyTour")
    },[])

  return (
    <div>NewTour</div>
  )
}

export default NewTour