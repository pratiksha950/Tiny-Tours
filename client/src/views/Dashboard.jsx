import React, {useEffect,useState} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import toast ,{Toaster} from 'react-hot-toast'
import { getUserJwtToken } from '../utils';
import newTour from "../assets/new-tour.png"
import {Link} from "react-router-dom"

function Dashboard() {
    const [tours,setTours]=useState([]);

    const userJwt=getUserJwtToken();

    const loadTours=async ()=>{
        const response=await axios.get("http://localhost:8080/tours",{
            headers:{
                Authorization:`Bearer ${userJwt}`
            }
        });
        if(response.data.success){
            toast.success(response.data.message)
            setTours(response.data.data)
        }else{
            toast.error(response.data.message)
        }
        
    }
        useEffect(()=>{
            loadTours();
        },[])

  return (
    <div>
        <Navbar />

        <Link to="/newtour">
        <img src={newTour} alt='newTour' className='fixed bottom-10 right-10 h-10 curser-pointer' />
        </Link>


        <Toaster />
    </div>
  )
}

export default Dashboard