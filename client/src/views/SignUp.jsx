import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"
import { useState } from "react"
import Input from "../components/Input.jsx"
import Button from "../components/Button.jsx"
import axios from "axios"
import toast,{Toaster} from "react-hot-toast"
import {Link} from "react-router-dom"
import Navbar from '../components/Navbar'

function SignUp() {
    const [newUser, setNewUser]=useState({
        name:"",
        email:"",
        mobile:"",
        city:"",
        country:"",
        password:""

    })
    useEffect(()=>{
        setPageTitle("SignUp-TinyTour")
    },[])

    const createUser=async()=>{
        const response=await axios.post(`${import.meta.env.VITE_API_BASE_URL}/signUp`,newUser);
        console.log(response.data);
        if(response.data.success){
            toast.success(response.data.message,{id:"signupSuccess"})
            setNewUser({
              name:"",
              email:"",
              mobile:"",
              city:"",
              country:"",
              password:""
            })

            setTimeout(()=>{
                window.location.href="/login"
            },1500)
        }else{
            toast.error(response.data.message,{id:"signuperror"})
        }
    }

  return (
    <> <Navbar />
    <div className="w-60 flex flex-col justify-center items-center m-auto gap-4 ">
       
        SignUp
        <Input 
        type="text"
        placeholder="Name"
        value={newUser.name}
        autoComplete="off"
        onChange={(e)=>{setNewUser({...newUser,name:e.target.value})}}
        />

        <Input 
        type="email"
        placeholder="Email"
        value={newUser.email}
        autoComplete="off"
        onChange={(e)=>{setNewUser({...newUser,email:e.target.value})}}
        />

        <Input 
        type="text"
        placeholder="mobile"
        value={newUser.mobile}
        onChange={(e)=>{setNewUser({...newUser,mobile:e.target.value})}}
        />

        <Input 
        type="text"
        placeholder="city"
        value={newUser.city}
        onChange={(e)=>{setNewUser({...newUser,city:e.target.value})}}
        />

        <Input 
        type="text"
        placeholder="country"
        value={newUser.country}
        onChange={(e)=>{setNewUser({...newUser,country:e.target.value})}}
        />

        <Input 
        type="password"
        placeholder="password"
        autoComplete="new-password"
        value={newUser.password}
        onChange={(e)=>{setNewUser({...newUser,password:e.target.value})}}
        />

        <Button title="signUp" onClick={createUser}/>
        <Link to="/login" className="text-blue-500">Already have an account? Login</Link>

       <Toaster/>
    </div>
    </>
  )
}

export default SignUp