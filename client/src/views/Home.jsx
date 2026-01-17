import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"
import Navbar from '../components/Navbar'



function Home() {
    useEffect(()=>{
        setPageTitle("Home-TinyTour")
    },[])
   
  return (
    <div>
       <Navbar />
       Home</div>
  )
}

export default Home