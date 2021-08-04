import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import Credentials, { UserInfo } from '../Helper/Context';
import "./Connection.css"
import Cover from "../assets/img/cover.jpg"
import emitToast from "../Helper/toastEmitter"
import useKeypress from '../CustomHooks/useKeyPress';


function Login() {

    const [loginData, setLoginData] = useState({ email: "", password: "" });
    let history = useHistory()
    const { loggedIn, setLoggedIn } = useContext(Credentials)
    useKeypress('Enter', () => {
        login()
    });

    useEffect(() => {
        if (loggedIn) {
            history.push('/')
        }


    }, [loggedIn])

    const login = async () => {
        const { email, password } = loginData
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };
        try {
            const response = await fetch('http://localhost:3002/api/users/login', requestOptions)
            const data = await response.json()

            if (data.message === "Email unknown") {
                return emitToast("error", data.message)
            }
            if (data.message === "Wrong password") {
                return emitToast("error", data.message)
            }

            if (data.credentials) {
                localStorage.setItem('credentials', JSON.stringify(data.credentials));
                setLoginData({ email: "", password: "" })
                setLoggedIn(true)
            }

        } catch (error) {
            console.warn(error)

        }
    }

    function handleChangeLogin(event) {
        const { name, value } = event.target;
        setLoginData((prevInputData) => ({ ...prevInputData, [name]: value }));
    }

    function goToRegisterPage() { history.push('/register') }

    return (
        <div className="connection-wrapper">
            <div className="connection-left-side-wrapper">
                {/* <img src={Cover} alt="cover" className="image-cover" /> */}
                <img src={"https://github.com/promathieuthiry/login-user-client/blob/main/src/assets/img/cover.jpg?raw=true"} alt="cover" className="image-cover" />
            </div>
            <div className="connection-right-side-wrapper">
                <div className="container-connection">
                    <p className="connection-welcome">Welcome back</p>
                    <p className="connection-title">Login to your account</p>

                    <p className="connection-label">Email</p>
                    <input type="email" name="email" value={loginData.email} onChange={handleChangeLogin} className="connection-input"></input>
                    <p className="connection-label" style={{ paddingTop: 11 }}>Password</p>
                    <input type="password" name="password" value={loginData.password} onChange={handleChangeLogin} className="connection-input"></input>
                    <div className="connection-forgot-password-wrapper">
                        <p className="connection-forgot-password">Forgot password?</p>
                    </div>
                    <button onClick={login} className="connection-button-submit">Login</button>
                </div>
                <p className="connection-footer-label">Dont have an account? <span style={{ color: "#2B6CB0", cursor: "pointer" }} className={"connection-free-today"} onClick={goToRegisterPage}>Join free today</span></p>

            </div>
        </div>

    )
}

export default Login