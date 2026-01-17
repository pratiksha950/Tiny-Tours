import React, { useEffect ,useState} from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import toast ,{Toaster} from 'react-hot-toast'
import { getUserJwtToken } from '../utils';

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
        <Toaster />
    </div>
  )
}

export default Dashboard