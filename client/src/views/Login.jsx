import {useEffect} from "react"
import {setPageTitle} from "../utils.jsx"



function Login() {
    useEffect(()=>{
        setPageTitle("Login-TinyTour")
    },[])

  return (
    <div>Login</div>
  )
}

export default Login