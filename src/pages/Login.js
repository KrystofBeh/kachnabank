import {useNavigate} from "react-router-dom";
import "../styles/Login.css"

function Login() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const convertedData = Object.fromEntries(formData.entries());

        const response = await fetch('http://localhost:8080/loginCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(convertedData)
        });

        console.log(convertedData);
        const data = await response.text();
        console.log(data);

        if (data.split(":")[0] === "Login successful") {

            const userId = data.split(":")[1];
            localStorage.setItem("userId", userId);

            alert("Přihlášení úspěšné");
            navigate("/");
        } else {
            alert("Špatné jméno nebo heslo");
        }

    }

    return (
        <div id="login-container">
            <h1 id="login-title">Přihlášení</h1>
            <form id="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">First name</label>
                    <input className="form-input" type="text" id="firstName" name="firstName"/>
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label">Last name</label>
                    <input className="form-input" type="text" id="lastName" name="lastName"/>
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input className="form-input" type="password" id="password" name="password"/>
                </div>
                <br />
                <button id="btn-submit-login" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;