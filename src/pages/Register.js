import {useNavigate} from "react-router-dom";
import "../styles/Register.css"

function Register() {

    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const convertedData = Object.fromEntries(formData.entries());

        const res = await fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(convertedData),
        });

        const data = await res.text();
        if (data.split(":")[0] === "Register successful") {

            const userId = data.split(":")[1];
            localStorage.setItem("userId", userId);

            alert("Registrace úspěšná");
            navigate("/");
        }
        else{
            alert("Chyba u registrace!")
        }

    }


    return (
        <div id="register-container">
            <h1 id="register-title">Registrace</h1>
            <form id="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Krestni jmeno</label>
                    <input className="form-input" type="text" id="name" name="firstName"/>
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label">Prijmeni</label>
                    <input className="form-input" type="text" id="name" name="lastName"/>
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label">Password</label>
                    <input className="form-input" type="password" id="password" name="password"/>
                </div>
                <br />
                <button id="btn-submit-register" type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;