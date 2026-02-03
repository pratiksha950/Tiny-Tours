import React, { useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import { getUserData,logOutUser } from '../utils'
import Button from './Button';
import {Toaster} from "react-hot-toast"
import { Link } from "react-router-dom"
import Avatar from './Avatar';


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
    <div className="
      fixed top-0 left-0 w-full z-50
     bg-gray-800 
      px-8 py-4
      flex items-center justify-between
      shadow-lg h-19 text-white
    ">
      <div className="flex items-center gap-3" >
        <Link to="/">
      <img src={logo} alt="logo" className='h-8 inline-block m-4 '/>
      <span className='text-xl font-extrabold text-white'>TripSpotter</span>
      </Link>
    </div>

    <div className="text-xl font-extrabold text-white">
      <Link to="/" className='mx-4'>Home</Link>
      <Link to="/newTour" className='mx-4'>Add Tours</Link>
      <Link to="/dashboard" className='mx-4'>See Tours</Link>
    </div>

<div className="flex items-center gap-4 justify-center">
  {userData?.name ? (
    <div className="flex items-center gap-4">
      <Avatar name={userData.name} />
      <span>Hello, {userData.name}!</span>
      <Button
        title="Logout"
        varient="secondary"
        onClick={logOutUser}
      />
    </div>
  ) : (
    <Link
      to="/login"
      className="bg-white text-blue-500 rounded px-4 py-1"
    >
      Login
    </Link>
  )}
</div>
    <Toaster />
   </div>
  )
}

export default Navbar