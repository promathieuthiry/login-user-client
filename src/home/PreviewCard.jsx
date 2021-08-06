import React from 'react'
import { MdPerson, MdPhone, MdRoom, MdEmail } from "react-icons/md";
import { IconContext } from "react-icons";

function PreviewCard({ inputData }) {
    return (
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
    )
}

export default PreviewCard
