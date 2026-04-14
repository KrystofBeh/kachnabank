import {useEffect, useState} from "react";

function Login() {


    const [user, setUser] = useState([]);

    useEffect(() => {fetch("http://localhost:8080/returnUsers")
        .then(res => res.json())
        .then(data => setUser(data));},[]);




    return (
        <form>
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