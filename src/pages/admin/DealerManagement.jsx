import React, { useState } from "react";
import "./DealerManagement.css";

const DealerManagement = () => {

    const [dealers, setDealers] = useState([
        {
            dealerCode: "DLR-001",
            dealerName: "Sai Vinayaka Batteries",
            shopName: "SV Batteries Store",
            id: "SRE-2024-001",
            location: "Bengaluru, KA",
            address: "JP Nagar 2nd Phase",
            tier: "Premium",
            status: "Pending",
        },
        {
            dealerCode: "DLR-002",
            dealerName: "Metro Auto Spares",
            shopName: "Metro Auto Hub",
            id: "SRE-2024-042",
            location: "Mumbai, MH",
            address: "Andheri West",
            tier: "Standard",
            status: "Approved",
        },
        {
            dealerCode: "DLR-002",
            dealerName: "Metro Auto Spares",
            shopName: "Metro Auto Hub",
            id: "SRE-2024-042",
            location: "Mumbai, MH",
            address: "Andheri West",
            tier: "Standard",
            status: "Approved",
        },
        {
            dealerCode: "DLR-002",
            dealerName: "Metro Auto Spares",
            shopName: "Metro Auto Hub",
            id: "SRE-2024-042",
            location: "Mumbai, MH",
            address: "Andheri West",
            tier: "Standard",
            status: "Approved",
        }
    ]);


    const handleStatusChange = (index, newStatus) => {
        const updatedDealers = [...dealers];
        updatedDealers[index].status = newStatus;
        setDealers(updatedDealers);
    };


    return (
        <div className="dealer-page">

            {/* Header */}
            <div className="page-header">
                <div>
                    <h2>Dealer & Distributor Management</h2>
                    <p>Monitor and manage your nationwide partner network.</p>
                </div>

                <div className="header-actions">
                    <button className="export-btn">Export List</button>
                    <button className="approve-btn">Approve New Dealer</button>
                </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <p>Total Partners</p>
                    <h3>1,248</h3>
                </div>
                <div className="stat-card">
                    <p>Premium Dealers</p>
                    <h3>452</h3>
                </div>
                <div className="stat-card">
                    <p>Regions Covered</p>
                    <h3>142 Cities</h3>
                </div>
                <div className="stat-card">
                    <p>Pending Approvals</p>
                    <h3>18</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="filter-bar">
                <input type="text" placeholder="Search by name, location or ID..." />
                <select>
                    <option>All Tiers</option>
                    <option>Premium</option>
                    <option>Standard</option>
                </select>
                <select>
                    <option>Active Status</option>
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Reject</option>
                </select>
            </div>

            {/* Table */}
            <div className="table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Dealer Code</th>  {/* ✅ New First Column */}
                            <th>Dealer Name</th>
                            <th>Shop Name</th> {/* ✅ New Column */}
                            <th>Location</th>
                            <th>Tier</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {dealers.map((dealer, index) => (
                            <tr key={index}>

                                {/* ✅ Dealer Code Column */}
                                <td>
                                    <span className="dealer-code">
                                        {dealer.dealerCode}
                                    </span>
                                </td>

                                <td>
                                    <strong>{dealer.dealerName}</strong>
                                    <p>ID: {dealer.id}</p>
                                </td>

                                <td>
                                    <strong>{dealer.shopName}</strong>
                                </td>

                                <td>
                                    {dealer.location}
                                    <p>{dealer.address}</p>
                                </td>

                                <td>
                                    <span className={`badge ${dealer.tier.toLowerCase()}`}>
                                        {dealer.tier}
                                    </span>
                                </td>

                                {/* <td>
                                    <span className={`status ${dealer.status.toLowerCase()}`}>
                                        {dealer.status}
                                    </span>
                                </td> */}

                                <td>
                                    <select
                                        className={`status-dropdown ${dealer.status.toLowerCase()}`}
                                        value={dealer.status}
                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                    >
                                        <option value="Approved">Approved</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                </td>


                                {/* <td>⋮</td> */}
                                <td>
                                    <button className="confirm-btn">
                                        Confirm
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* <div className="table-footer">
                    Showing 1 to 5 of 1,248 entries
                </div> */}

                <div className="table-footer">

                    <div className="footer-left">
                        Showing 1 to 5 of 1,248 entries
                    </div>

                    <div className="footer-right">
                        <button className="page-btn">Prev</button>

                        <button className="page-number active">1</button>
                        <button className="page-number">2</button>
                        <button className="page-number">3</button>
                        <button className="page-number">4</button>

                        <button className="page-btn">Next</button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default DealerManagement;