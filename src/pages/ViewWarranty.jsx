import React from 'react'
import './ViewWarranty.css'
import { useState } from 'react';
import axios from 'axios';
import Loading from './admin/components/Loading';
import Alert from './admin/components/Alert';

const ViewWarranty = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [serialNo, setSerialNo] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [warrantyData, setWarrantyData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // 👈 loading state
  const [alertData, setAlertData] = useState(null); // 👈 alert state

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      setAlertData({ type: "error", message: "Please login to submit warranty request" });
      // navigate("/login");
      return;
    }

    setLoading(true);
    try {
      // const token = localStorage.getItem("token");
      // const token = "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiIxIiwiZW1haWwiOiJwYXVsQGdtYWlsLmNvbSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzcyMzE3MjA5LCJleHAiOjE3NzIzMTc4MTB9.eyOf7SayU4xzBrGliIUvVjvcc78BwnY5MN43rg1ZrvkCH_LK3XoepHzeCtG6na5E";

      const response = await axios.post(
        `${apiUrl}/warranty/check`,
        {
          serialNo,
          purchaseDate
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        }
      );

      setWarrantyData(response.data);
      setShowModal(true);
      setAlertData({ type: "success", message: "Warranty details fetched successfully ✅" });

    } catch (err) {
      // console.error(err);
      setShowModal(false);

      // Error message from server if available
      let message = "Warranty not found or invalid details.";
      if (err.response?.data?.errorMessage) {
        message = err.response.data.errorMessage;
      }

      setAlertData({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="view-warranty">
      {loading && <Loading message="Checking warranty..." />}
      {alertData && <Alert type={alertData.type} message={alertData.message} onClose={() => setAlertData(null)} />}

      <h1>View Warranty</h1>

      <form className="view-warranty-form" onSubmit={handleSubmit}>
        <div className="form-group full">
          <label htmlFor="serialNumber">Battery Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            value={serialNo}
            onChange={(e) => setSerialNo(e.target.value)}
            placeholder="Enter battery serial number"
            required
          />
        </div>

        {/* <div className="form-group full">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="text"
            id="mobileNumber"
            placeholder="Enter registered mobile number"
          />
        </div> */}

        <div className="form-group full">
          <label htmlFor="purchaseDate">Date of Purchase</label>
          <input type="date" id="purchaseDate" value={purchaseDate} onChange={(e) => setPurchaseDate(e.target.value)} required />
        </div>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>

      {error && <p className="error-msg">{error}</p>}

      {/* Modal Popup */}
      {showModal && warrantyData && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Warranty Details</h2>

            <p><strong>Serial No:</strong> {warrantyData.serialNo}</p>
            <p><strong>Purchase Date:</strong> {warrantyData.purchaseDate}</p>
            <p><strong>Warranty Period:</strong> {warrantyData.warrantyMonths} Months</p>
            <p><strong>Expiry Date:</strong> {warrantyData.expiryDate}</p>

            <p>
              <strong>Status:</strong>{" "}
              <span className={warrantyData.status === "ACTIVE" ? "green" : "red"}>
                {warrantyData.status}
              </span>
            </p>

            <p>
              <strong>Warranty Status:</strong>{" "}
              <span className={warrantyData.warrantyStatus === "APPROVED" ? "green" : "red"}>
                {warrantyData.warrantyStatus}
              </span>
            </p>

            {warrantyData.status === "ACTIVE" && (
              <p><strong>Remaining Days:</strong> {warrantyData.remainingDays}</p>
            )}

            <button onClick={() => setShowModal(false)} className="view-arranty-close-btn">
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default ViewWarranty