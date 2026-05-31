import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../styles/Home.css";

function Home(){

    const [data, setData] = useState("Nacita");
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState([]);
    const userId = localStorage.getItem("userId");

    fetch("http://localhost:8080/get")
        .then(res => res.text())
        .then(data => setData(data))
        .catch(err => setData("Chyba"));

    useEffect(() => {
        async function loadAccounts() {
            try {
                const response = await fetch(`http://localhost:8080/getAccounts/${userId}`);

                if (!response.ok) {
                    throw new Error("Chyba při načítání účtů");
                }

                const data = await response.json();
                setAccounts(data);

            } catch (err) {
                console.error(err);
            }
        }

        if (userId) {
            loadAccounts();
        }
    }, [userId]);

    return (
        <div id="home-container">
            <button id="btn-create-acc" onClick={() => navigate("/createAcc")}>
                Vytvorit acc
            </button>

            <h1 id="home-status-title">{data}</h1>

            <ul id="accounts-list">
                {accounts.map((acc) => (
                    <li key={acc.id} className="account-item">
                        <span className="account-name">{acc.name}</span>
                        <button className="btn-details" onClick={() =>  navigate(`/acc/${userId}/${acc.id}`)}>Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;