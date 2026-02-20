import { useEffect, useState } from "react";
import { setPageTitle } from "../utils.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function SignUp() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    password: "",
  });

  useEffect(() => {
    setPageTitle("SignUp-TinyTour");
  }, []);

  const createUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/signUp`,
        newUser
      );

      if (response.data.success) {
        toast.success(response.data.message, { id: "signupSuccess" });

        setNewUser({
          name: "",
          email: "",
          mobile: "",
          city: "",
          country: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        toast.error(response.data.message, { id: "signuperror" });
      }
    } catch (error) {
      toast.error("Server not responding " + error.message);
    }
  };

  return (
    <>
    <>
  <Navbar />

  <h1 className="mt-20 text-3xl font-bold text-center text-gray-800">
    Sign Up
  </h1>

  <form
    onSubmit={createUser}
    className="w-full max-w-md mx-auto mt-6 bg-white shadow-xl p-6 rounded-xl flex flex-col gap-4 border"
  >
    <Input
      type="text"
      placeholder="Name"
      value={newUser.name}
      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      className="w-full"
    />

    <Input
      type="email"
      placeholder="Email"
      value={newUser.email}
      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      className="w-full"
    />

    <Input
      type="text"
      placeholder="Mobile"
      value={newUser.mobile}
      onChange={(e) => setNewUser({ ...newUser, mobile: e.target.value })}
      className="w-full"
    />

    <Input
      type="text"
      placeholder="City"
      value={newUser.city}
      onChange={(e) => setNewUser({ ...newUser, city: e.target.value })}
      className="w-full"
    />
    <Input
      type="text"
      placeholder="Country"
      value={newUser.country}
      onChange={(e) => setNewUser({ ...newUser, country: e.target.value })}
      className="w-full"
    />

    <Input
      type="password"
      placeholder="Password"
      autoComplete="new-password"
      value={newUser.password}
      onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
      className="w-full"
    />

    <Button title="Sign Up" type="submit" varient="primary" />

    <Link to="/login" className="text-blue-600 text-sm text-center hover:underline">
      Already have an account? Login
    </Link>

    <Toaster />
  </form>
</>
    </>
  );
}

export default SignUp;
