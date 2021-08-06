import React, { useEffect, useContext, useState } from 'react'
import "./Navbar.css"
import { Link, Redirect, useHistory } from "react-router-dom"
import Credentials from '../Helper/Context'
import { MdMenu, MdArrowBack } from "react-icons/md";
import { IconContext } from "react-icons";
import useDetectClickOut from "../CustomHooks/useDetectClickOut"


export default function Navbar() {

    let history = useHistory()
    const { loggedIn, setLoggedIn } = useContext(Credentials)
    const [menuIsActive, setMenuIsActive] = useState(false)
    const { show, setShow, nodeRef, triggerRef } = useDetectClickOut(false);


    // useEffect(() => {
    //     debugger
    //     function onClose(event) {
    //         const ignoreClickOnMeElement = document.getElementById('navbar-dropdown-menu');
    //         if (ignoreClickOnMeElement) {
    //             const isClickInsideElement = ignoreClickOnMeElement.contains(event?.target);
    //             if (!isClickInsideElement) {
    //                 setMenuIsActive(false)
    //             }
    //         }

    //     }

    //     document.addEventListener('click', onClose);
    //     return () => document.removeEventListener('click', onClose);
    // }, []);

    function openMenu() {
        return setMenuIsActive(!menuIsActive)
    }

    return (
        <div>
            <nav className="navbar">
                {/* <div style={{ flex: 1 }}>
                    <IconContext.Provider value={{ style: { fontSize: '25px', color: "#1A202C" } }}>
                        <MdArrowBack />
                    </IconContext.Provider>
                </div> */}
                <div onClick={openMenu} className="navbar-icon-menu" ref={triggerRef}>
                    <IconContext.Provider value={{ style: { fontSize: '32px', color: "#1A202C" } }}>
                        <MdMenu />
                    </IconContext.Provider>
                </div>
                {/* {menuIsActive && */}
                {show &&
                    <div id="navbar-dropdown-menu" ref={nodeRef}>
                        <p className="navbar-dropdown-row" onClick={goToHomePage}>Home</p>
                        <p className="navbar-dropdown-row" onClick={goToEditPage}>Edit</p>
                        <p className="navbar-dropdown-row" onClick={logout}>Logout</p>
                    </div>
                }
                <button onClick={logout} className={"logout-button"}>logout</button>
            </nav>
        </div>
    )


    function goToHomePage() {
        setShow(false)
        history.push("/")
    }
    function goToEditPage() {
        setShow(false)
        history.push("/edit")
    }
    function logout() {
        setShow(false)
        localStorage.clear()
        setLoggedIn(false)
        history.push('/login')
    }
}
