import React, { useState, useEffect, useRef } from "react";
import { MdModeEdit, MdPerson, MdPhone, MdRoom, MdEmail } from "react-icons/md";
import { IconContext } from "react-icons";
import RingLoader from "react-spinners/FadeLoader";



export default function EditInfo({ inputData, fileSelectHandler, handleChange, updateId, isLoading }) {

    const [checked, setChecked] = React.useState(false);
    const hiddenFileInput = useRef(null);

    const handleChangeCheckbox = () => {
        setChecked(!checked);
    };

    async function addFile() {
        hiddenFileInput.current.click()
    }


    return (
        <div className="dashboard-form-wrapper">

            <p className="dashboard-title">
                <IconContext.Provider value={{ style: { fontSize: '22px', color: "#1A202C" } }}>
                    <MdModeEdit />
                </IconContext.Provider>
                <span style={{ paddingLeft: "5px" }}>Edit Profile</span>
            </p>

            <div className="dashboard-wrapper-image">
                <div className="dashboard-image" onClick={addFile}>
                    {/* <RingLoader color={"#000"} loading={isLoading} size={50} /> */}
                    {isLoading ?
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingLeft: 15 }}>
                            <RingLoader color={"#04C45C"} loading={isLoading} size={50} />
                        </div>
                        : inputData.profilPicture ?
                            <div className="dashboard-profile-pic-wrapper">
                                <img src={`${process.env.REACT_APP_API_BASE_URL}/api/users/img/${inputData.profilPicture}`} alt="profile" className="dashboard-profile-pic" />
                            </div>
                            :
                            <IconContext.Provider value={{ style: { fontSize: '72px', color: "#1A202C" } }}>
                                <MdPerson />
                            </IconContext.Provider>
                    }

                    <input type="file" name="file" ref={hiddenFileInput} onChange={fileSelectHandler} hidden accept="image/*" />
                    <button className={"edit-photo-button"}>
                        <IconContext.Provider value={{ style: { fontSize: '18px', color: "#FFF" } }}>
                            <MdModeEdit />
                        </IconContext.Provider>
                    </button>

                </div>
            </div>

            <div className="dashboard-input-same-line" >
                <div className="dashboard-input-label-column">
                    <p className="dashboard-label">First Name</p>
                    <input type="text" name="firstName" value={inputData.firstName} onChange={handleChange} className="dashboard-input" placeholder="Thomas D"></input>
                </div>
                <div className="dashboard-input-label-column">
                    <p className="dashboard-label">Last Name</p>
                    <input type="text" name="lastName" value={inputData.lastName} onChange={handleChange} className="dashboard-input" placeholder="Hardisson"></input>
                </div>
            </div>

            <div className="dashboard-input-same-line" style={{ paddingTop: 22 }}>
                <div className="dashboard-input-label-column">
                    <p className="dashboard-label">Occupation</p>
                    <input type="text" name="occupation" value={inputData.occupation} onChange={handleChange} className="dashboard-input" placeholder="Web developer"></input>
                </div>
                <div className="dashboard-input-label-column">
                    <p className="dashboard-label">Contacts Number</p>
                    <input type="number" name="phone" value={inputData.phone} onChange={handleChange} className="dashboard-input" placeholder="661-724-7734"></input>
                </div>
            </div>

            <div className="dashboard-one-line-wrapper">
                <p className="dashboard-label">Email</p>
                <input type="email" name="email" value={inputData.email} onChange={handleChange} className="dashboard-input" placeholder="thomashardisson@gmail.com"></input>
            </div>

            <div className="dashboard-one-line-wrapper">
                <p className="dashboard-label">Address</p>
                <input type="text" name="address" value={inputData.address} onChange={handleChange} className="dashboard-input" placeholder="1368 Hayhurst lane."></input>
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
                <input type="password" name="password" value={inputData.password} onChange={handleChange} className="dashboard-input" disabled={!checked}></input>
            </div>
            {checked &&
                <div className="dashboard-one-line-wrapper">
                    <div style={{ display: "flex", alignItems: "center", paddingBottom: "11px" }}>
                        <p className="dashboard-label" style={{ paddingBottom: "0px", paddingLeft: "10px" }}>Repeat password</p>
                    </div>
                    <input type="password" name="password_confirmation" value={inputData.password_confirmation} onChange={handleChange} className="dashboard-input" disabled={!inputData.password}></input>
                </div>
            }
            <button onClick={updateId} className={"save-button"}>Save</button>
        </div>
    )
}
