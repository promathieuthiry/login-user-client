import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router";
import Credentials from "../Helper/Context";
import FetchData from "../Helper/FetchData";
import loggedInContext from "../Helper/Context"
import PublicHomePage from "./PublicHomePage";
import ConnectionListener from "../Connection/ConnectionListener"

function Dashboard({ authorized }) {
    const [inputData, setInputData] = useState({ firstName: "", lastName: "" });
    const [updateData, setUpdateData] = useState({ firstName: "", lastName: "" });
    const [userList, setUserList] = useState([])
    const { loggedIn, setLoggedIn } = useContext(Credentials)
    let history = useHistory()

    useEffect(() => {
        getData()
    }, [])

    function handleChange(event) {
        const { name, value } = event.target;
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
    }

    function handleChangeUpdate(event) {
        const { name, value } = event.target;
        setUpdateData((prevUpdateData) => ({ ...prevUpdateData, [name]: value }));
    }

    async function getData() {
        try {
            const response = await FetchData("/api/users", "GET");
            setUserList(response)
            console.log(response)
        } catch (err) {
            console.warn(err)
        }

    }

    // const handleSubmit = async () => {
    //     const { firstName, lastName } = inputData
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ firstName, lastName })
    //     };
    //     try {
    //         const response = await fetch('http://localhost:3002/api/users/register', requestOptions)
    //         const data = response.json()
    //         console.log(data)
    //         setInputData({ firstName: "", lastName: "" })
    //         await getData()
    //     } catch (error) {
    //         console.warn(error)
    //     }
    // }

    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:3002/api/users/delete/${id}`, { method: 'DELETE' })
            await getData()
        } catch (err) {
            console.warn(err)
        }
    }

    const updateId = async (id) => {
        const { firstName, lastName } = updateData
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName })
        };
        try {
            const response = await fetch(`http://localhost:3002/api/users/update/${id}`, requestOptions)
            const data = response.json()
            console.log(data)
            await getData()
            setUpdateData({ firstName: "", lastName: "" })
        } catch (error) {

        }

    }

    return (
        <div className="App">
            <ConnectionListener />
            <button onClick={logout}>logout</button>

            {authorized ?
                <div>
                    <p>Liste users</p>
                    {/* <input
                name="firstName"
                placeholder="Prénom"
                value={inputData.firstName}
                onChange={handleChange}
            />

            <input
                name="lastName"
                placeholder="Nom"
                value={inputData.lastName}
                onChange={handleChange}
            />

            <button onClick={handleSubmit}>Ajouter</button> */}

                    <div>
                        {userList.map(user => {
                            return (
                                <div key={user.id} style={{ display: "flex", flexDirection: 'row' }}>
                                    <p>{user.firstName}</p>
                                    <p>{user.lastName}</p>
                                    <button onClick={() => deleteUser(user.id)}>delete</button>

                                    <input
                                        name="firstName"
                                        placeholder="Prénom"
                                        value={updateData.firstName}
                                        onChange={handleChangeUpdate}
                                    />

                                    <input
                                        name="lastName"
                                        placeholder="Nom"
                                        value={updateData.lastName}
                                        onChange={handleChangeUpdate}
                                    />

                                    <button onClick={() => updateId(user.id)}>update</button>
                                </div>
                            )
                        })}
                    </div>
                </div>
                : <PublicHomePage />
            }
        </div>
    )

    function logout() {
        localStorage.clear()
        setLoggedIn(false)
        history.push('/')
    }
}

export default Dashboard
