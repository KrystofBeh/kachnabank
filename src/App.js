import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";


function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
