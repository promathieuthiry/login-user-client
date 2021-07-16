import React, { useState, useEffect } from 'react'
import "./Connection.css"

function Connection() {

    const [registrationData, setRegistrationData] = useState({ email: "", password: "" });
    const [loginData, setLoginData] = useState({ email: "", password: "" });

    function handleChangeRegistration(event) {
        const { name, value } = event.target;
        setRegistrationData((prevInputData) => ({ ...prevInputData, [name]: value }));
    }

    function handleChangeLogin(event) {
        const { name, value } = event.target;
        setLoginData((prevInputData) => ({ ...prevInputData, [name]: value }));
    }

    const register = async () => {
        const { email, password } = registrationData
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };
        try {
            const response = await fetch('http://localhost:3002/api/users/register', requestOptions)
            const data = response.json()
            console.log(data)
            setRegistrationData({ email: "", password: "" })
        } catch (error) {
            console.warn(error)
        }
    }


    const login = async () => {
        const { email, password } = loginData
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };
        try {
            const response = await fetch('http://localhost:3002/api/users/login', requestOptions)
            const data = response.json()
            console.log(data)
            setLoginData({ email: "", password: "" })
        } catch (error) {
            console.warn(error)
        }
    }


    return (
        <div className="connection-wrapper">
            <div className="connection-module">
                <h1>Registration</h1>
                <label>email</label>
                <input type="text" name="email" value={registrationData.email} onChange={handleChangeRegistration}></input>
                <label>password</label>
                <input type="text" name="password" value={registrationData.password} onChange={handleChangeRegistration}></input>
                <button onClick={register}>Register</button>
            </div>

            <div className="connection-module">
                <h1>Login</h1>
                <label>email</label>
                <input type="text" name="email" value={loginData.email} onChange={handleChangeLogin}></input>
                <label>password</label>
                <input type="text" name="password" value={loginData.password} onChange={handleChangeLogin}></input>
                <button onClick={login}>Login</button>

            </div>

        </div>
    )
}

export default Connection
