import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "../styles/AccountDetails.css"

function AccountDetails(){
    const {userId, accId} = useParams();
    const [account, setAccount] = useState(null);

    const [targetAccName, setTargetAccName] = useState("");
    const [amount, setAmount] = useState("");

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

    const handleTransfer = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/transfer", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    sourceAccountId: accId,
                    targetAccountName: targetAccName,
                    amount: parseFloat(amount)
                })
            });

            if (response.ok) {
                const msg = await response.text();
                alert(msg);
                setTargetAccName("");
                setAmount("");
                loadAccount();
            } else {
                alert("Chyba při převodu peněz.");
            }
        } catch (error) {
            console.error("Chyba sítě:", error);
        }
    };

    if (!account) return <h1 id="loading-text">Nacitani....</h1>;

    return (
        <div id="account-details-container">
            <h1 className="details-title">Detaily účtu</h1>
            <div className="account-info-box">
                <p className="info-row"><strong>Název:</strong> <span>{account.name}</span></p>
                <p className="info-row"><strong>Zůstatek:</strong> <span className="balance-amount">{account.balance} Kč</span></p>
            </div>

            <hr className="section-divider" />

            <h3 className="form-title">Poslat peníze</h3>
            <form id="transfer-form" onSubmit={handleTransfer}>
                <div className="form-group">
                    <label className="form-label">Jméno účtu </label>
                    <input
                        className="form-input"
                        type="text"
                        value={targetAccName}
                        onChange={(e) => setTargetAccName(e.target.value)}
                        required
                    />
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label">Částka: </label>
                    <input
                        className="form-input"
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <br />
                <button id="btn-submit-transfer" type="submit">Odeslat platbu</button>
            </form>
        </div>
    );
}

export default AccountDetails;