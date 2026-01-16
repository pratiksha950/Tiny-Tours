import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"


function Home() {
    useEffect(()=>{
        setPageTitle("Home-TinyTour")
    },[])
   
  return (
    <div>Home</div>
  )
}

export default Home