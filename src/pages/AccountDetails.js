import {data, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function AccountDetails(){

    const {userId, accId} = useParams();
    const [account, setAccount] = useState(null);

    useEffect(() => {

        async function loadAccount(){
            try{
                const response = await fetch(`http://localhost:8080/acc/${userId}/${accId}`);
                if (!response.ok){
                    throw new Error("Chyba při načítání účtů");
                }

                const data = await response.json();
                setAccount(data);

            }
            catch (error) {
                console.log(error);
            }
        }

        loadAccount()

    }, [userId, accId]);

    if (!account) return <h1>Nacitani....</h1>;

    return (
        <div>
            <h1>Detaili uctu</h1>
            <p>{account.name}</p>
            <p>{account.balance}</p>
        </div>
    );
}

export default AccountDetails