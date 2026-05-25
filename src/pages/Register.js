import {useNavigate} from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Krestni jmeno</label>
                <input type="text" id="name" name="firstName"/>
            </div>
            <div>
                <label>Prijmeni</label>
                <input type="text" id="name" name="lastName"/>
            </div>
            <div>
                <label>Password</label>
                <input type="password" id="password" name="password"/>
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register;