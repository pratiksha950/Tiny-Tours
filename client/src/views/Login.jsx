import {useEffect} from "react"


function Login() {
    useEffect(()=>{
        document.title="Login-TinyTour"
    },[])

  return (
    <div>Login</div>
  )
}

export default Login