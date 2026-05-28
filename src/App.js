import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import CreateAccount from "./pages/CreateAccount";
import AccountDetails from "./pages/AccountDetails";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {

  return (
      <BrowserRouter>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <Link to={"/"}>Home</Link>
              <Link to={"/login"}>Login</Link>
              <Link to={"/register"}>Register</Link>
          </nav>
          <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/createAcc" element={<CreateAccount/>} />
              <Route path="/acc/:userId/:accId" element={<AccountDetails/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
