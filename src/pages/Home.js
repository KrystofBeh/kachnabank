import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Home(){

    const [data, setData] = useState("Nacita");
    const navigate = useNavigate();

    fetch("http://localhost:8080/get")
        .then(res => res.text())
        .then(data => setData(data))
        .catch(err => setData("Chyba"));



    return (
        <div>
            <button id={"CreateAcc"} onClick={() => navigate("/createAcc")}>Vytvorit acc</button>
            <h1>{data}</h1>
        </div>
    )
}

export default Home;