import {useNavigate} from "react-router-dom";

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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Jmeno uctu</label>
                <input type="text" id="accName" name="accName"/>
            </div>
            <div>
                <label>Balanc uctu</label>
                <input type="number" id="balance" name="balance"/>
            </div>
            <button type="submit">Register</button>
        </form>
    )

}

export default CreateAccount;

