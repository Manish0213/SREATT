import React from 'react'
import { useState } from 'react';
import image3 from '../../assets/ProductImages/image3.png';
import image4 from '../../assets/ProductImages/image4.png';
import image5 from '../../assets/ProductImages/image5.png';
import image6 from '../../assets/ProductImages/image6.png';
import './WarrantyManagement.css';

const WarrantyManagement = () => {

    const [data, setData] = useState([
        {
            name: "Pro Max X-120",
            productImage: image3,
            SerialNo: "SN123456789",
            dealerName: "Sai Vinayaka Batteries",
            dealerCode: "DLR-001",
            shopName: "SV Batteries Store",
            customerName: "Sunil Kumar",
            purchaseDate: "2026-02-15",
            status: "Pending",
        },
        {
            name: "SREATT Silver S-65",
            productImage: image4,
            SerialNo: "SN123456789",
            dealerName: "Metro Auto Spares",
            dealerCode: "DLR-002",
            shopName: "Metro Auto Hub",
            customerName: "Sunil Kumar",
            purchaseDate: "2026-02-15",
            status: "Approved",
        },
        {
            name: "Titanium M-X",
            productImage: image5,
            SerialNo: "SN123456789",
            dealerName: "Metro Auto Spares",
            dealerCode: "DLR-002",
            shopName: "Metro Auto Hub",
            customerName: "Sunil Kumar",
            purchaseDate: "2026-02-15",
            status: "Approved",
        },
        {
            name: "SREATT Gold MT-7",
            productImage: image6,
            SerialNo: "SN123456789",
            dealerName: "Metro Auto Spares",
            dealerCode: "DLR-002",
            shopName: "Metro Auto Hub",
            customerName: "Sunil Kumar",
            purchaseDate: "2026-02-15",
            status: "Approved",
        }
    ]);

    const handleStatusChange = (index, newStatus) => {
        const updatedData = [...data];
        updatedData[index].status = newStatus;
        setData(updatedData);
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
                            <th>Product Details</th>
                            <th>Dealer Details</th>
                            <th>Customer Name</th>
                            <th>Purchase Date</th>
                            <th>Warranty Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((data, index) => (
                            <tr key={index}>

                                {/* <td>
                                    <strong>{data.name}</strong>
                                    <p>Serial No. <span className="dealer-code">{data.SerialNo}</span></p>
                                </td> */}

                                <td>
                                    <div className="product-info-cell">
                                        <img
                                            src={data.productImage}
                                            alt={data.name}
                                            className="product-thumb"
                                        />

                                        <div>
                                            <strong>{data.name}</strong>
                                            <p>
                                                SN.
                                                <span className="dealer-code">{data.SerialNo}</span>
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <strong>{data.shopName}</strong>
                                    <p>D Code: <span className="dealer-code">{data.dealerCode}</span></p>
                                </td>

                                <td>
                                    <strong>{data.customerName}</strong>
                                </td>

                                <td>
                                    {data.purchaseDate}
                                </td>

                                <td>
                                    <select
                                        className={`status-dropdown ${data.status.toLowerCase()}`}
                                        value={data.status}
                                        onChange={(e) => handleStatusChange(index, e.target.value)}
                                    >
                                        <option value="Approved">Approved</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Reject">Reject</option>
                                    </select>
                                </td>

                                <td>
                                    <button className="confirm-btn">
                                        Confirm
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

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
    )
}

export default WarrantyManagement