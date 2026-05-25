import {useNavigate} from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>First name</label>
                <input type="text" id="firstName" name="firstName"/>
            </div>

            <div>
                <label>Last name</label>
                <input type="text" id="lastName" name="lastName"/>
            </div>

            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default Login;