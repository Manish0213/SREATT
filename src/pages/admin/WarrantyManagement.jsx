import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import image3 from '../../assets/ProductImages/image3.png';
import image4 from '../../assets/ProductImages/image4.png';
import image5 from '../../assets/ProductImages/image5.png';
import image6 from '../../assets/ProductImages/image6.png';
import './WarrantyManagement.css';
import Alert from './components/Alert';
import Loading from './components/Loading';

const WarrantyManagement = () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [size] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false); // 👈 loading state
    const [alertData, setAlertData] = useState(null); // 👈 alert state

    // const [data, setData] = useState([
    //     {
    //         name: "Pro Max X-120",
    //         productImage: image3,
    //         SerialNo: "SN123456789",
    //         dealerName: "Sai Vinayaka Batteries",
    //         dealerCode: "DLR-001",
    //         shopName: "SV Batteries Store",
    //         customerName: "Sunil Kumar",
    //         purchaseDate: "2026-02-15",
    //         status: "Pending",
    //     },
    //     {
    //         name: "SREATT Silver S-65",
    //         productImage: image4,
    //         SerialNo: "SN123456789",
    //         dealerName: "Metro Auto Spares",
    //         dealerCode: "DLR-002",
    //         shopName: "Metro Auto Hub",
    //         customerName: "Sunil Kumar",
    //         purchaseDate: "2026-02-15",
    //         status: "Approved",
    //     },
    //     {
    //         name: "Titanium M-X",
    //         productImage: image5,
    //         SerialNo: "SN123456789",
    //         dealerName: "Metro Auto Spares",
    //         dealerCode: "DLR-002",
    //         shopName: "Metro Auto Hub",
    //         customerName: "Sunil Kumar",
    //         purchaseDate: "2026-02-15",
    //         status: "Approved",
    //     },
    //     {
    //         name: "SREATT Gold MT-7",
    //         productImage: image6,
    //         SerialNo: "SN123456789",
    //         dealerName: "Metro Auto Spares",
    //         dealerCode: "DLR-002",
    //         shopName: "Metro Auto Hub",
    //         customerName: "Sunil Kumar",
    //         purchaseDate: "2026-02-15",
    //         status: "Approved",
    //     }
    // ]);

    const handleStatusChange = (index, newStatus) => {
        const updatedData = [...data];
        updatedData[index].status = newStatus;
        setData(updatedData);
    };

    useEffect(() => {
        fetchWarranties();
    }, [page, search, status]);

    const fetchWarranties = async () => {

        const token = localStorage.getItem("token");
        // const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MjEzMDg4MywiZXhwIjoxNzcyMTMxNDgzfQ.BCwGS4g0AGlRmQTn-CEalloPsdR7oDUkH9vNZikXx7rQb1fsnk_ckXtGz-vlKcof";

        try {
            const response = await axios.get(
                `${apiUrl}/warranty/warranties`,
                {
                    params: {
                        page,
                        size,
                        search: search || null,
                        status: status || null
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setData(response.data.content);
            setTotalPages(response.data.totalPages);
            console.log("first", response.data.content);

        } catch (error) {
            console.error("Error fetching warranties", error);
        }
    };

    const handleConfirm = async (warrantyId, status) => {
        if (status === "PENDING") {
            // alert("Pending status cannot be confirmed");
            setAlertData({ type: "error", message: "Pending status cannot be confirmed" });
            return;
        }

        setLoading(true);
        const token = localStorage.getItem("token");
        try {
            const response = await axios.put(
                `${apiUrl}/warranty/${warrantyId}?status=${status}`,
                null,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            // Update local state after successful confirmation
            // setData(prev => prev.map(w => w.id === warrantyId ? { ...w, status: status } : w));

            setAlertData({ type: "success", message: "Status updated successfully ✅" });

        } catch (error) {
            console.error(error);

            let message = "Something went wrong";
            if (error.response?.data?.errorMessage) message = error.response.data.errorMessage;

            setAlertData({ type: "error", message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dealer-page">
            {loading && <Loading message="Processing..." />}
            {alertData && <Alert type={alertData.type} message={alertData.message} onClose={() => setAlertData(null)} />}

            {/* Header */}
            <div className="page-header">
                <div>
                    <h2>Warranty Status Management</h2>
                    <p>Keep track of your warranty network efficiently and effortlessly.</p>
                </div>

                {/* <div className="header-actions">
                    <button className="export-btn">Export List</button>
                    <button className="approve-btn">Approve New Dealer</button>
                </div> */}
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
                <input type="text" placeholder="Search by Customer name" value={search} onChange={(e) => { setSearch(e.target.value); setPage(0); }} />
                {/* <select>
                    <option>Active Status</option>
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Reject</option>
                </select> */}
                <select
                    value={status}
                    onChange={(e) => {
                        setStatus(e.target.value);
                        setPage(0);
                    }}
                >
                    <option value="">All Status</option>
                    <option value="APPROVED">Approved</option>
                    <option value="PENDING">Pending</option>
                    <option value="REJECTED">Rejected</option>
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
                                            alt={data.productName}
                                            className="product-thumb"
                                        />

                                        <div>
                                            <strong>{data.productName}</strong>
                                            <p>
                                                SN.
                                                <span className="dealer-code">{data.productSerialNo}</span>
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <strong>{data.distributorShopName}</strong>
                                    <p>D Code: <span className="dealer-code">{data.distributorDealerCode}</span></p>
                                </td>

                                <td>
                                    <strong>{data.userName}</strong>
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
                                        <option value="APPROVED">Approved</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </td>

                                <td>
                                    <button disabled={data.status === "PENDING"} className="confirm-btn" onClick={() => handleConfirm(data.id, data.status)} >
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

                    {/* <div className="footer-right">
                        <button className="page-btn">Prev</button>

                        <button className="page-number active">1</button>
                        <button className="page-number">2</button>
                        <button className="page-number">3</button>
                        <button className="page-number">4</button>

                        <button className="page-btn">Next</button>
                    </div> */}

                    <div className="footer-right">

                        <button
                            disabled={page === 0}
                            onClick={() => setPage(prev => prev - 1)}
                            className="page-btn"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setPage(index)}
                                className={`page-number ${page === index ? "active" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={page + 1 === totalPages}
                            onClick={() => setPage(prev => prev + 1)}
                            className="page-btn"
                        >
                            Next
                        </button>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default WarrantyManagement