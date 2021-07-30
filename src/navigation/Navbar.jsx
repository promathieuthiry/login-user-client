import React, { useEffect, useContext } from 'react'
import "./Navbar.css"
import { Link, Redirect, useHistory } from "react-router-dom"
import Credentials from '../Helper/Context'

export default function Navbar({ authorized }) {

    let history = useHistory()
    const { loggedIn, setLoggedIn } = useContext(Credentials)

    useEffect(() => {
        console.log(authorized, "authorized")
    }, [authorized])

    return (
        <div>
            <nav className="navbar">
                <div className="navbar--link">
                    {/* <img src={Logo} alt="logo" className="navbar--logo" /> */}
                    {/* <Link to="/" className="navbar--link-item">Home</Link> */}
                </div>
                {authorized &&
                    <div>
                        <span>Bienvenue</span>
                        <button onClick={logout} className={"logout-button"}>logout</button>
                    </div>
                }

                {/* {authorized ?
                    <ul className="navbar--link">
                        <Link to="/login" className="navbar--link-item">Login</Link>
                        <Link to="/register" className="navbar--link-item">Register</Link>
                    </ul>
                    : <p>Connecté</p>
                } */}
            </nav>
        </div>
    )

    function logout() {
        localStorage.clear()
        setLoggedIn(false)
        history.push('/login')
    }
}
