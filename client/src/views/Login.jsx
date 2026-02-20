import { useEffect, useState } from "react"
import { setPageTitle } from "../utils.jsx"
import Input from "../components/Input.jsx"
import Button from "../components/Button.jsx"
import axios from "axios"
import toast, { Toaster } from "react-hot-toast"
import { Link } from "react-router-dom"
import Navbar from '../components/Navbar'


function Login() {
  useEffect(() => {
    setPageTitle("Login-TinyTour")
  }, [])

  const [loginUser, setLoginUser] = useState({
    email: "",
    password: ""
  })

  const checkUserLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/login`,
        loginUser
      )
      console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message, { id: "loginSuccess" })
        setLoginUser({ email: "", password: "" })


        const {token,data}=response.data;
        localStorage.setItem("userJwtToken",token);
        localStorage.setItem("userData",JSON.stringify(data));

        setTimeout(()=>{
          window.location.href="/dashboard";
        },1500)

      } else {
        toast.error(response.data.message, { id: "loginFail" })
      }
    } catch (error) {
      toast.error("Server not responding"+error.message)
    }
  }

  return (
    <> 
    <> 
<Navbar />

<h1 className="mt-20 text-3xl font-bold text-center text-gray-800">
  Login
</h1>

<form
  onSubmit={checkUserLogin}
  className="w-full max-w-md mx-auto mt-6 bg-white shadow-xl p-6 rounded-xl flex flex-col gap-4 border"
>

  <Input
    type="email"
    placeholder="Email"
    autoComplete="off"
    value={loginUser.email}
    onChange={(e) =>
      setLoginUser({ ...loginUser, email: e.target.value })
    }
    className="w-full"
  />

  <Input
    type="password"
    placeholder="Password"
    autoComplete="new-password"
    value={loginUser.password}
    onChange={(e) =>
      setLoginUser({ ...loginUser, password: e.target.value })
    }
    className="w-full"
  />

  <Button title="Login" type="submit" varient=" secondary" />

  <Link 
    to="/signUp" 
    className="text-blue-600 text-sm text-center hover:underline"
  >
    Don't have an account? Sign Up
  </Link>

  <Toaster />
</form>
</>
    </>
  )
}

export default Login
