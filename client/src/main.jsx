import { createRoot } from 'react-dom/client';
import './index.css';
import {BrowserRouter,Route,Routes} from "react-router"

const root =createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Home</h1>}></Route>
      <Route path="/about" element={<h1>About</h1>}></Route>
      <Route path="/contact" element={<h1>Contact</h1>}></Route>
    </Routes>
  </BrowserRouter>,
)
