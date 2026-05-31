import {useNavigate} from "react-router-dom";
import "../styles/CreateAccount.css"

function CreateAccount() {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        const userId = localStorage.getItem("userId");


        const res = await fetch("http://localhost:8080/createAccount", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                name: data.accName,
                balance: data.balance,
                userId: userId,
            }),
        });

        const result = await res.text();
        console.log(result);
        if (result === "Acc creation successful") {
            alert(result);
            navigate("/"); //TODO MUSIM ZMENIT NA ACC PREVIEW
        }

    }

    return (
        <div id="create-account-container">
            <h1 id="create-account-title">Vytvořit nový účet</h1>
            <form id="create-account-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Jmeno uctu</label>
                    <input className="form-input" type="text" id="accName" name="accName"/>
                </div>
                <br />
                <div className="form-group">
                    <label className="form-label">Balanc uctu</label>
                    <input className="form-input" type="number" id="balance" name="balance"/>
                </div>
                <br />
                <button id="btn-submit-account" type="submit">Register</button>
            </form>
        </div>
    )

}

export default CreateAccount;