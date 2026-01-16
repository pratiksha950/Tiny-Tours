import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"
import { useState } from "react"
import Input from "../components/Input.jsx"


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

  return (
    <div>SignUp
        <Input 
        type="text"
        placeholder="Name"
        value={newUser.name}
        onChange={(e)=>{setNewUser({...newUser,name:e.target.value})}}
        ></Input>
    </div>
  )
}

export default SignUp