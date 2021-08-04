import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Credentials from "../Helper/Context";
import FetchData from "../Helper/FetchData";
import ConnectionListener from "../Connection/ConnectionListener"
import "./Dashboard.css"
import { MdModeEdit, MdPerson } from "react-icons/md";
import { IconContext } from "react-icons";
import emitToast from "../Helper/toastEmitter";


function Dashboard({ authorized, userInfo }) {
    const [inputData, setInputData] = useState({ firstName: userInfo?.firstName ? userInfo.firstName : "", lastName: userInfo?.lastName ? userInfo?.lastName : "", email: userInfo?.email ? userInfo.email : "", phone: userInfo?.phone ? userInfo.phone : "", address: userInfo?.address ? userInfo.address : "", city: userInfo?.city ? userInfo.city : "", state: userInfo?.state ? userInfo.state : "", zipcode: userInfo?.zipcode ? userInfo.zipcode : "", country: userInfo?.country ? userInfo.country : "", password: "", password_confirmation: "" });
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [checked, setChecked] = React.useState(false);

    const hiddenFileInput = useRef(null);

    const handleChangeCheckbox = () => {
        setChecked(!checked);
    };


    function handleChange(event) {
        const { name, value } = event.target;
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
    }

    const deleteUser = async (id) => {
        try {
            await fetch(`http://localhost:3002/api/users/delete/${id}`, { method: 'DELETE' })
        } catch (err) {
            console.warn(err)
        }
    }

    const updateId = async () => {
        const { firstName, lastName, email, phone, address, city, state, zipcode, country, password, password_confirmation } = inputData
        const body = { firstName, lastName, email, phone, address, city, state, zipcode, country, password, password_confirmation }
        try {
            const response = await FetchData(`/api/users/update/${userInfo.id}`, 'PUT', body)
            if (response.message[0] === "Updated with success") {
                const { firstName, lastName, email, phone, address, city, state, zipcode, country, password } = response.data
                emitToast("success", "Updated with success")
                setInputData({ firstName, lastName, email, phone, address, city, state, zipcode, country })
            }
            else {
                response.message.map(error => {
                    return (
                        emitToast("error", error.message)
                    )
                }
                )
            }
            console.log(response)
        } catch (error) {

        }

    }

    async function addFile() {
        hiddenFileInput.current.click()
    }

    async function fileSelectHandler(event) {
        // setSelectedFile(event.target.files[0])
        const image = event.target.files[0]
        console.log(image, "image")
        const data = new FormData()
        data.append('file', image)
        data.append('users_id', userInfo.id)

        const credentials = await JSON.parse(localStorage.getItem('credentials'))
        if (credentials) {
            const requestOptions = {
                method: "POST",
                // headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': credentials.token },
                headers: { 'x-auth-token': credentials.token },
                body: data
            };
            const route = `${process.env.REACT_APP_API_BASE_URL}/api/users/image`
            try {
                const response = await fetch(route, requestOptions)
                const data = response.json()
                console.log(data, "data")
            } catch (error) {
                console.warn(error)
            }
        }
    }


    return (
        <div className="dashboard-wrapper">
            <ConnectionListener />

            <div className="dashboard-left-side">
                <div className="dashboard-form-wrapper">

                    <p className="dashboard-title">
                        <IconContext.Provider value={{ style: { fontSize: '22px', color: "#1A202C" } }}>
                            <MdModeEdit />
                        </IconContext.Provider>
                        <span style={{ paddingLeft: "5px" }}>Edit Profile</span>
                    </p>

                    <div className="dashboard-wrapper-image">
                        <div className="dashboard-image" onClick={addFile}>

                            <IconContext.Provider value={{ style: { fontSize: '72px', color: "#1A202C" } }}>
                                <MdPerson />
                            </IconContext.Provider>
                            {/* <input type="file" name="file" ref={hiddenFileInput} onChange={addFile} style={{ display: "none" }} /> */}
                            <input type="file" name="file" ref={hiddenFileInput} onChange={fileSelectHandler} hidden accept="image/*" />
                            <button className={"edit-photo-button"}>
                                <IconContext.Provider value={{ style: { fontSize: '18px', color: "#FFF" } }}>
                                    <MdModeEdit />
                                </IconContext.Provider>
                            </button>

                        </div>
                    </div>

                    <img src={"http://localhost/Users/pro/Documents/Développement web/pratique/login-user/login-user-server/app/utilities/uploads/1628040167517-login-user-.jpg"} />
                    <div className="dashboard-input-same-line">
                        <div className="dashboard-input-label-column">
                            <p className="dashboard-label">First Name</p>
                            <input type="text" name="firstName" value={inputData.firstName} onChange={handleChange} className="dashboard-input" placeholder="Thomas D"></input>
                        </div>
                        <div className="dashboard-input-label-column">
                            <p className="dashboard-label">Last Name</p>
                            <input type="text" name="lastName" value={inputData.lastName} onChange={handleChange} className="dashboard-input" placeholder="Hardisson"></input>
                        </div>
                    </div>
                    <div className="dashboard-one-line-wrapper">
                        <p className="dashboard-label">Email</p>
                        <input type="email" name="email" value={inputData.email} onChange={handleChange} className="dashboard-input" style={{ width: "100%" }} placeholder="thomashardisson@gmail.com"></input>
                    </div>
                    <div className="dashboard-one-line-wrapper">
                        <p className="dashboard-label">Contacts Number</p>
                        <input type="number" name="phone" value={inputData.phone} onChange={handleChange} className="dashboard-input" style={{ width: "100%", maxWidth: "600px" }} placeholder="661-724-7734"></input>
                    </div>
                    <div className="dashboard-one-line-wrapper">
                        <p className="dashboard-label">Address</p>
                        <input type="text" name="address" value={inputData.address} onChange={handleChange} className="dashboard-input" style={{ width: "100%", maxWidth: "600px" }} placeholder="1368 Hayhurst lane."></input>
                    </div>
                    <div className="dashboard-input-same-line" style={{ paddingTop: "22px" }}>
                        <div className="dashboard-input-label-column">
                            <p className="dashboard-label">City</p>
                            <input type="text" name="city" value={inputData.city} onChange={handleChange} className="dashboard-input" placeholder="Mcallen"></input>
                        </div>
                        <div className="dashboard-input-label-column">
                            <p className="dashboard-label">State</p>
                            <input type="text" name="state" value={inputData.state} onChange={handleChange} className="dashboard-input" placeholder="New York"></input>
                        </div>
                    </div>
                    <div className="dashboard-input-same-line" style={{ paddingTop: "22px" }}>
                        <div className="dashboard-input-label-column">
                            <p className="dashboard-label">Zip code</p>
                            <input type="text" name="zipcode" value={inputData.zipcode} onChange={handleChange} className="dashboard-input" placeholder="11357"></input>
                        </div>
                        <div className="dashboard-input-label-column">
                            <p className="dashboard-label">Country</p>
                            <input type="text" name="country" value={inputData.country} onChange={handleChange} className="dashboard-input" placeholder="United States"></input>
                        </div>
                    </div>
                    <div className="dashboard-one-line-wrapper">
                        <div style={{ display: "flex", alignItems: "center", paddingBottom: "11px" }}>
                            <input type="checkbox" onChange={handleChangeCheckbox} /><p className="dashboard-label" style={{ paddingBottom: "0px", paddingLeft: "10px" }}>Change password</p>
                        </div>
                        <input type="password" name="password" value={inputData.password} onChange={handleChange} className="dashboard-input" style={{ width: "100%", maxWidth: "600px" }} disabled={!checked}></input>
                    </div>
                    {checked &&
                        <div className="dashboard-one-line-wrapper">
                            <div style={{ display: "flex", alignItems: "center", paddingBottom: "11px" }}>
                                <p className="dashboard-label" style={{ paddingBottom: "0px", paddingLeft: "10px" }}>Repeat password</p>
                            </div>
                            <input type="password" name="password_confirmation" value={inputData.password_confirmation} onChange={handleChange} className="dashboard-input" style={{ width: "100%", maxWidth: "600px" }} disabled={!inputData.password}></input>
                        </div>
                    }
                    <button onClick={updateId} className={"save-button"}>Save</button>
                </div>
            </div>
        </div >
    )


}

export default Dashboard
