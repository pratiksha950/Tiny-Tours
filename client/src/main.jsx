import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "./views/Home";
import Login from "./views/Login";
import SignUp from "./views/SignUp";
import Tours from "./views/Tours";
import NewTour from "./views/NewTour";
import EditTour from "./views/EditTour";
import Dashboard from "./views/Dashboard";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/newtour" element={<NewTour />} />
      <Route path="/editTour" element={<EditTour />} />
    </Routes>
  </BrowserRouter>
);
