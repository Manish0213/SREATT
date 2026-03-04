import React, { useState, useEffect } from "react";
import "./DealerManagement.css";
import axios from "axios";
import Alert from "./components/Alert";
import Loading from "./components/Loading";

const DealerManagement = () => {
    const apiUrl = import.meta.env.VITE_API_URL;;

    const [dealers, setDealers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);

    // const [dealers, setDealers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [totalElements, setTotalElements] = useState(0);

    const pageSize = 5;

    useEffect(() => {
        fetchDealers();
    }, [currentPage, searchTerm, selectedStatus]);

    const handleStatusChange = (dealerId, newStatus) => {
        const updatedDealers = dealers.map((dealer) =>
            dealer.id === dealerId
                ? { ...dealer, status: newStatus }
                : dealer
        );

        setDealers(updatedDealers);
        console.log("new status", newStatus);
    };

    // const fetchDealers = async () => {
    //     try {
    //         // const token = localStorage.getItem("token");
    //         const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJtYW5pc2gwMzExMUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MTkyNTQxOCwiZXhwIjoxNzcxOTI2MDE4fQ.GnbF_caftkPMuUeK94w2bfxLlQCiKy1gErqni6foNXRVC0Rv3DLZPR_loqiP4p85";

    //         const response = await axios.get(
    //             "http://localhost:8090/distributor/getAllDistributors",
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${token}`
    //                 }
    //             }
    //         );

    //         setDealers(response.data);
    //         setLoading(false);
    //         // console.log("dealer data", response.data);

    //     } catch (error) {
    //         console.error("Error fetching dealers:", error);
    //         setLoading(false);
    //     }
    // };

    const handleConfirm = async (dealer) => {
        setLoading(true); // ✅ overlay start

        try {
            const token = localStorage.getItem("token");
            // const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJtYW5pc2gwMzExMUBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MTg2NzU4MywiZXhwIjoxNzcxODY4MTgzfQ.w4irm25-kCr9HcM8GFUJaL2JhwYGWhCjr8ew-nHinoUEnMAxPZPhXiB9IZbxquc-";

            const response = await axios.put(
                `${apiUrl}/api/admin/distributors/${dealer.id}/status`,
                { status: dealer.status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAlertData({
                type: "success",
                message: "Status Updated Successfully ✅",
            });

        } catch (error) {
            console.error("Error updating status:", error);
            
            // ✅ Agar backend ka structure same hai
            const message =
                error.response?.data?.errorMessage ||
                "Failed to update status ❌";

            setAlertData({
                type: "error",
                message,
            });

        } finally {
            setLoading(false); // ✅ overlay stop
        }
    };

    const fetchDealers = async () => {
        try {
            const token = localStorage.getItem("token");
            // const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJyb2xlIjoiVVNFUiIsImlhdCI6MTc3MjEyMzI1OCwiZXhwIjoxNzcyMTIzODU4fQ.aCy6sSx3gQWqJ5Y1yHuj6p9PVcxuK_Lm8hLg6tPDal9N89qanAU9x_7O1aJN9ILO"

            const response = await axios.get(
                `${apiUrl}/distributor/distributors`,
                {
                    params: {
                        page: currentPage,
                        size: pageSize,
                        search: searchTerm || null,
                        status: selectedStatus || null
                    },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDealers(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);

        } catch (error) {
            console.error("Error fetching distributors:", error);
        }
    };

    const handleSearch = () => {
        setCurrentPage(0);
        fetchDealers();
    };

    return (
        <div className="dealer-page">
            {loading && <Loading message="Please wait..." />}
            {alertData && <Alert type={alertData.type} message={alertData.message} />}

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
                {/* <div className="dealer-search-container"> */}
                    <input type="text" placeholder="Search by name, location or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    {/* <button className="dealer-search-btn" onClick={handleSearch}>
                        Search
                    </button> */}
                {/* </div> */}
                {/* <select>
                    <option>All Tiers</option>
                    <option>Premium</option>
                    <option>Standard</option>
                </select> */}
                <select value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setCurrentPage(0) }}>
                    <option value="">Active Status</option>
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
                            <th>Dealer Code</th>  {/* ✅ New First Column */}
                            <th>Dealer Name</th>
                            <th>Shop Name</th> {/* ✅ New Column */}
                            <th>Location</th>
                            {/* <th>Tier</th> */}
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
                                    {/* <p className="dealer-id">ID: {dealer.id}</p> */}
                                </td>

                                <td>
                                    <strong>{dealer.shopName}</strong>
                                </td>

                                <td>
                                    {/* {dealer.location} */}
                                    {dealer.city}, {dealer.state}
                                    <p>{dealer.area}</p>
                                </td>

                                {/* <td>
                                    <span className={`badge ${dealer.tier.toLowerCase()}`}>
                                        {dealer.tier}
                                    </span>
                                </td> */}

                                <td>
                                    <select
                                        className={`status-dropdown ${dealer.status.toLowerCase()}`}
                                        value={dealer.status}
                                        onChange={(e) => handleStatusChange(dealer.id, e.target.value)}
                                    >
                                        <option value="APPROVED">Approved</option>
                                        <option value="PENDING">Pending</option>
                                        <option value="REJECTED">Rejected</option>
                                    </select>
                                </td>

                                <td>
                                    <button className="confirm-btn" onClick={() => handleConfirm(dealer)}>
                                        Confirm
                                    </button>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="table-footer">

                    {/* <div className="footer-left">
                        Showing 1 to 5 of 1,248 entries
                    </div> */}

                    <div className="footer-left">
                        Showing{" "}
                        {totalElements === 0
                            ? 0
                            : currentPage * pageSize + 1}{" "}
                        to{" "}
                        {Math.min((currentPage + 1) * pageSize, totalElements)}{" "}
                        of {totalElements} entries
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
                            disabled={currentPage === 0}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="page-btn"
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                // className={currentPage === index ? "active" : ""}
                                className={`page-number ${currentPage === index ? "active" : ""}`}
                                onClick={() => setCurrentPage(index)}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages - 1}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="page-btn"
                        >
                            Next
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default DealerManagement;