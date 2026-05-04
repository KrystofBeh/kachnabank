import {useEffect, useState} from "react";

function Login() {


    // const [user, setUser] = useState([]);
    //
    // useEffect(() => {fetch("http://localhost:8080/returnUsers")
    //     .then(res => res.json())
    //     .then(data => setUser(data));},[]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const convertedData = Object.fromEntries(formData.entries());

        fetch('http://localhost:8080/loginCheck', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(convertedData)
        })
    }





    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Jméno</label>
                <input type="text" id="name" name="name"/>
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