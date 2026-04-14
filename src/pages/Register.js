function Register() {

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const convertedData = Object.fromEntries(formData.entries());

        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(convertedData),
        }).then(res => alert("Funguje to doufam"));

    }


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">Krestni jmeno</label>
                <input type="text" id="name" name="firstName"/>
            </div>
            <div>
                <label htmlFor="lastName">Prijmeni</label>
                <input type="text" id="name" name="lastName"/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password"/>
            </div>
            <button type="submit">Register</button>
        </form>
    )
}

export default Register;