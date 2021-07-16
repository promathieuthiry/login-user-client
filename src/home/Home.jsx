import React, { useState, useEffect } from "react";

function Home() {
    const [inputData, setInputData] = useState({ firstName: "", lastName: "" });
    const [updateData, setUpdateData] = useState({ firstName: "", lastName: "" });
    const [userList, setUserList] = useState([])

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

    const getData = () => {
        fetch('http://localhost:3002/api/users')
            .then(response => response.json())
            .then(data => {
                setUserList(data)
                console.log(data)
            })
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
        const response = await fetch(`http://localhost:3002/api/users/update/${id}`, requestOptions)
        const data = response.json()
        console.log(data)
        await getData()
        setUpdateData({ firstName: "", lastName: "" })
    }

    return (
        <div className="App">
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
    )
}

export default Home
