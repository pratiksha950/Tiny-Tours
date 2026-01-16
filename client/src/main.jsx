import { createRoot } from 'react-dom/client';
import './index.css';
import {BrowserRouter,Route,Routes} from "react-router"
import Home from './views/Home';
import Login from './views/Login';
import SignUp from './views/SignUp';
import Tours from './views/Tours';
import NewTour from './views/NewTour';
import EditTour from './views/EditTour';

const root =createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/SignUp" element={<SignUp />}></Route>
      <Route path="/tours" element={<Tours />}></Route>
      <Route path="/newtour" element={<NewTour />}></Route>
      <Route path="/editTour" element={<EditTour />}></Route>
      
    </Routes>
  </BrowserRouter>
)
