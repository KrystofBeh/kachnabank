import {useState} from "react";

function Home(){

    const [data, setData] = useState("Nacita");

    fetch("http://localhost:8080/get")
        .then(res => res.text())
        .then(data => setData(data))
        .catch(err => setData("Chyba"));



    return (
        <h1>{data}</h1>
    )
}

export default Home;