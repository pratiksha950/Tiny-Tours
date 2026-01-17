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
        "http://localhost:8080/login",
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
    <> <Navbar />
    <form
      onSubmit={checkUserLogin}
      className="w-60 flex flex-col justify-center items-center m-auto mt-10  gap-4 "
    >
      {/* <h2 className="font-semibold">Login</h2> */}

      <Input
        type="email"
        placeholder="Email"
        autoComplete="off"
        value={loginUser.email}
        onChange={(e) =>
          setLoginUser({ ...loginUser, email: e.target.value })
        }
      />

      <Input
        type="password"
        placeholder="Password"
        autoComplete="new-password"
        value={loginUser.password}
        onChange={(e) =>
          setLoginUser({ ...loginUser, password: e.target.value })
        }
      />

      <Button title="Login" type="submit" varient=" secondary"/>

      <Link to="/signUp" className="text-blue-500 text-sm">
        Don't have an account? SignUp
      </Link>

      <Toaster />
    </form>
    </>
  )
}

export default Login
