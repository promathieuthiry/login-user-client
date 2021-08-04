import React, { useState, useEffect, useContext } from 'react'
import Credentials from '../Helper/Context';
import { useHistory } from "react-router-dom"
import Cover from "../assets/img/cover.jpg"
import emitToast from "../Helper/toastEmitter"
import useKeypress from '../CustomHooks/useKeyPress';


function Register() {

    const [registrationData, setRegistrationData] = useState({ email: "", password: "", passwordConfirmation: "" });
    const { loggedIn, setLoggedIn } = useContext(Credentials)
    let history = useHistory()
    useKeypress('Enter', () => {
        register()
    });

    useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }

    }, [loggedIn])


    function handleChangeRegistration(event) {
        const { name, value } = event.target;
        setRegistrationData((prevInputData) => ({ ...prevInputData, [name]: value }));
    }

    const register = async () => {
        const { email, password, passwordConfirmation } = registrationData
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, passwordConfirmation })
        };
        try {
            const register = await fetch('http://localhost:3002/api/users/register', requestOptions)
            const { isRegistered, message } = await register.json()
            if (isRegistered) {
                const response = await fetch('http://localhost:3002/api/users/login', requestOptions)
                const data = await response.json()
                if (data.credentials) {
                    localStorage.setItem('credentials', JSON.stringify(data.credentials));
                    setRegistrationData({ email: "", password: "", passwordConfirmation: "" })
                    emitToast("success", "Registered with success")
                    setLoggedIn(true)
                }
            }
            else {
                message.map(error => {
                    return (
                        emitToast("error", error.message)
                    )
                }
                )
            }

        } catch (error) {
            console.warn(error)
        }
    }

    return (
        <div className="connection-wrapper">
            <div className="connection-left-side-wrapper">
                <img src={"https://github.com/promathieuthiry/login-user-client/blob/main/src/assets/img/cover.jpg?raw=true"} alt="cover" className="image-cover" />
            </div>
            <div className="connection-right-side-wrapper">
                <div className="container-connection">
                    <p className="connection-welcome">Welcome</p>
                    <p className="connection-title">Register a new account</p>
                    <p className="connection-label">Email</p>
                    <input type="email" name="email" value={registrationData.email} onChange={handleChangeRegistration} className="connection-input"></input>
                    <p className="connection-label" style={{ paddingTop: 11 }}>Password</p>
                    <input type="password" name="password" value={registrationData.password} onChange={handleChangeRegistration} className="connection-input"></input>
                    <p className="connection-label" style={{ paddingTop: 11 }}>Repeat password</p>
                    <input type="password" name="passwordConfirmation" value={registrationData.passwordConfirmation} onChange={handleChangeRegistration} className="connection-input" disabled={!registrationData.password}></input>
                    <button onClick={register} className="connection-button-register">Register</button>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", marginTop: "20px" }}>
                        <p className="connection-forgot-password" onClick={() => history.goBack()}>Go back</p>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Register
