import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";
import CreateAccount from "./pages/CreateAccount";
import AccountDetails from "./pages/AccountDetails";
import "./styles/App.css"

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {

    return (
        <BrowserRouter>
            <nav id="main-navbar" className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="navbar-brand-placeholder">Banka</div>
                <div className="nav-links-container">
                    <Link className="nav-link-item" to={"/"}>Home</Link>
                    <Link className="nav-link-item" to={"/login"}>Login</Link>
                    <Link className="nav-link-item" to={"/register"}>Register</Link>
                </div>
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