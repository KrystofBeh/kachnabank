import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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
        <div>
            <button onClick={() => navigate("/createAcc")}>
                Vytvorit acc
            </button>

            <h1>{data}</h1>

            <ul>
                {accounts.map((acc) => (
                    <li key={acc.id}>
                        {acc.name}
                        <button onClick={() =>  navigate(`/acc/${userId}/${acc.id}`)}>Details</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;