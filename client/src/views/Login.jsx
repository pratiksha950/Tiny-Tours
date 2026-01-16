import {useEffect, useState} from "react"
import {setPageTitle} from "../utils.jsx"
import Input from "../components/Input.jsx"
import Button from "../components/Button.jsx"
import axios from "axios"

function Login() {
    useEffect(()=>{
        setPageTitle("Login-TinyTour")
    },[])

    const [loginUser,setLoginUser]=useState({
      email:"",
      password:""
    })

    const checkUserLogin=async()=>{
      const response=await axios.post("http://localhost:8080/login",loginUser)
      console.log(response.data)
    }
  return (
    <div className="w-60 flex flex-col justify-center items-center m-auto gap-4 ">Login
      <Input 
        type="email"
        placeholder="Email"
        value={loginUser.email}
        onChange={(e)=>{setLoginUser({...loginUser,email:e.target.value})}}
        />

        <Input 
        type="password"
        placeholder="password"
        value={loginUser.password}
        onChange={(e)=>{setLoginUser({...loginUser,password:e.target.value})}}
        />

        <Button title="login" onClick={checkUserLogin}/>

    </div>
  )
}

export default Login