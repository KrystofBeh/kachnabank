import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function AccountDetails(){
    const {userId, accId} = useParams();
    const [account, setAccount] = useState(null);

    // Stavy pro formulář převodu
    const [targetAccId, setTargetAccId] = useState("");
    const [amount, setAmount] = useState("");

    // Funkce pro načtení detailu účtu (vytáhli jsme ji ven, abychom ji mohli volat znovu po převodu)
    async function loadAccount(){
        try {
            const response = await fetch(`http://localhost:8080/acc/${userId}/${accId}`);
            if (!response.ok){
                throw new Error("Chyba při načítání účtu");
            }
            const data = await response.json();
            setAccount(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadAccount();
    }, [userId, accId]);

    // Funkce pro odeslání peněz
    const handleTransfer = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/transfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,                // <--- TADY posíláme userId
                    sourceAccountId: accId,
                    targetAccountId: targetAccId,
                    amount: parseFloat(amount)
                })
            });

            if (response.ok) {
                const msg = await response.text();
                alert(msg);
                setTargetAccId("");
                setAmount("");
                loadAccount();
            } else {
                alert("Chyba při převodu peněz.");
            }
        } catch (error) {
            console.error("Chyba sítě:", error);
        }
    };

    if (!account) return <h1>Nacitani....</h1>;

    return (
        <div>
            <h1>Detaily účtu</h1>
            <p><strong>Název:</strong> {account.name}</p>
            <p><strong>Zůstatek:</strong> {account.balance} Kč</p>

            <hr />

            <h3>Poslat peníze</h3>
            <form onSubmit={handleTransfer}>
                <div>
                    <label>ID cílového účtu: </label>
                    <input
                        type="text"
                        value={targetAccId}
                        onChange={(e) => setTargetAccId(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div>
                    <label>Částka: </label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button type="submit">Odeslat platbu</button>
            </form>
        </div>
    );
}

export default AccountDetails;