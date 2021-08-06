import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router";
import Credentials from "../Helper/Context";
import FetchData from "../Helper/FetchData";
import ConnectionListener from "../Connection/ConnectionListener"
import "./Dashboard.css"
import { MdModeEdit, MdPerson, MdPhone, MdRoom, MdEmail } from "react-icons/md";
import { IconContext } from "react-icons";
import emitToast from "../Helper/toastEmitter";
import EditInfo from "./EditInfo";


function Dashboard({ authorized, userInfo, isEdit }) {
    const [inputData, setInputData] = useState({ firstName: userInfo?.firstName ? userInfo.firstName : "", lastName: userInfo?.lastName ? userInfo?.lastName : "", occupation: userInfo?.occupation ? userInfo?.occupation : "", email: userInfo?.email ? userInfo.email : "", phone: userInfo?.phone ? userInfo.phone : "", address: userInfo?.address ? userInfo.address : "", city: userInfo?.city ? userInfo.city : "", state: userInfo?.state ? userInfo.state : "", zipcode: userInfo?.zipcode ? userInfo.zipcode : "", country: userInfo?.country ? userInfo.country : "", password: "", password_confirmation: "", profilPicture: false });
    const [selectedFile, setSelectedFile] = React.useState(null);


    useEffect(() => {
        userInfo?.id && getProfilePic()
    }, [])

    function handleChange(event) {
        const { name, value } = event.target;
        setInputData((prevInputData) => ({ ...prevInputData, [name]: value }));
    }

    async function getProfilePic() {
        try {
            const { hasImage, idfiles } = await FetchData(`/api/users/has/img/${userInfo?.id}`, 'GET')
            if (hasImage) {
                setInputData({ ...inputData, profilPicture: idfiles })
            }
        } catch (error) {
            console.warn(error)
        }
    }

    const updateId = async () => {
        const { firstName, lastName, occupation, email, phone, address, city, state, zipcode, country, password, password_confirmation } = inputData
        const body = { firstName, lastName, occupation, email, phone, address, city, state, zipcode, country, password, password_confirmation }
        try {
            const response = await FetchData(`/api/users/update/${userInfo.id}`, 'PUT', body)
            if (response.message[0] === "Updated with success") {
                const { firstName, lastName, occupation, email, phone, address, city, state, zipcode, country, password } = response.data
                emitToast("success", "Updated with success")
                setInputData((prevInputData) => ({ ...prevInputData, firstName, lastName, occupation, email, phone, address, city, state, zipcode, country }))
            }
            else {
                response.message.map(error => {
                    return (
                        emitToast("error", error.message)
                    )
                })
            }
        } catch (error) {

        }

    }


    async function fileSelectHandler(event) {
        const image = event.target.files[0]
        const data = new FormData()
        data.append('file', image)
        data.append('users_id', userInfo.id)

        const credentials = await JSON.parse(localStorage.getItem('credentials'))
        if (credentials) {
            const requestOptions = {
                method: "POST",
                headers: { 'x-auth-token': credentials.token },
                body: data
            };
            const route = `${process.env.REACT_APP_API_BASE_URL}/api/users/image`
            try {
                debugger
                const response = await fetch(route, requestOptions)
                const { message, idfiles } = await response.json()
                if (message === "Sent with success") {
                    emitToast("success", "Image updated with success")
                    setInputData({ ...inputData, profilPicture: idfiles.insertId })
                }
            } catch (error) {
                emitToast("error", "An error occured while uploading")
                console.warn(error)
            }
        }
    }



    return (
        <div>
            {isEdit ?
                <div style={{ width: "100%", height: "100%" }}>
                    <ConnectionListener />
                    <EditInfo inputData={inputData} fileSelectHandler={(data) => fileSelectHandler(data)} handleChange={handleChange} updateId={updateId} />
                </div>
                :
                <div className="dashboard-wrapper">
                    <ConnectionListener />

                    <div className="dashboard-left-side">
                        <EditInfo inputData={inputData} fileSelectHandler={(data) => fileSelectHandler(data)} handleChange={handleChange} updateId={updateId} />
                    </div>
                    <div className="dashboard-right-side">
                        <div className="dashboard-card-preview-wrapper">
                            <div className="dashboard-user-card-header" style={{ borderBottom: "1px solid #E8E8E8", paddingBottom: 10 }}>
                                <div className="dashboard-user-profile-picture">
                                    <IconContext.Provider value={{ style: { fontSize: '42px', color: "#1A202C" } }}>
                                        <MdPerson />
                                    </IconContext.Provider>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10 }}>
                                    <p className="dashboard-user-name">{inputData?.firstName ? inputData?.firstName : "ND"} {inputData?.lastName ? inputData?.lastName : "ND"}</p>
                                    <p className="dashboard-user-occupation">{inputData?.occupation ? inputData?.occupation : "ND"}</p>
                                </div>
                            </div>

                            {/* <div style={{ backgroundColor: "#E8E8E8", width: "100%", paddingTop: 10, paddingBottom: 10, height: 1 }} /> */}
                            <div className="dashboard-user-card-header">
                                <div className="dashboard-user-profile-picture" style={{ border: "none" }}>
                                    <IconContext.Provider value={{ style: { fontSize: '32px', color: "#28A21A" } }}>
                                        <MdPhone />
                                    </IconContext.Provider>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10 }}>
                                    <p className="dashboard-user-phone">{inputData.phone}</p>
                                </div>
                            </div>

                            <div className="dashboard-user-card-header">
                                <div className="dashboard-user-profile-picture" style={{ border: "none" }}>
                                    <IconContext.Provider value={{ style: { fontSize: '32px', color: "#4A5568" } }}>
                                        <MdEmail />
                                    </IconContext.Provider>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10 }}>
                                    <p className="dashboard-user-phone">{inputData.email}</p>
                                </div>
                            </div>


                            <div className="dashboard-user-card-header">
                                <div className="dashboard-user-profile-picture" style={{ border: "none" }}>
                                    <IconContext.Provider value={{ style: { fontSize: '32px', color: "#E73932" } }}>
                                        <MdRoom />
                                    </IconContext.Provider>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", paddingLeft: 10 }}>
                                    <p className="dashboard-user-address">{inputData?.address}   {inputData?.city}</p>
                                    <p className="dashboard-user-zipcode">{inputData?.state} {inputData?.zipcode} {inputData.country}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div >
            }
        </div>
    )


}

export default Dashboard
