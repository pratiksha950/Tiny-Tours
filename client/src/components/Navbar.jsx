import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { getUserData,logOutUser } from '../utils'
import Button from './Button';
import {Toaster} from "react-hot-toast"
import { Link } from "react-router-dom"


function Navbar() {
  const [userData,setUserData]=useState({});

  const fetchUserData=()=>{
    const data=getUserData();
    setUserData(data);
    console.log("fetch user data",data);
  }

  useEffect(()=>{
    fetchUserData();
  },[])

  return (
    <div className="bg-blue-400 text-white px-6 py-3 flex justify-around items-center">
      <div>
        <Link to="/">
      <img src={logo} alt="logo" className='h-8 inline-block' />
      <span>Tiny Tours</span>
      </Link>
    </div>

    <div>
    {userData?.name?(
      <div className='flex item-center'>
        <span className='bg-black text-white flex item-center justify-center h-8 w-8 rounded-full mr-2'>{userData?.name[0]}</span>
        Hello, {userData.name}!
       <Button title="Logout" varient=' secondary' onClick={logOutUser}/>
      </div>
    ):(
      <Link to="/login" className='bg-white text-blue-500 rounded mr-2 py-1'>Login
      </Link>
    )}

    </div>
    <Toaster />
   </div>
  )
}

export default Navbar