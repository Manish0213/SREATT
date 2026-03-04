import React from 'react'
import './DistributerWarranty.css';
import { useState } from 'react';
import axios from 'axios';
import Loading from './admin/components/Loading';
import Alert from './admin/components/Alert';

const DistributerWarranty = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const [formData, setFormData] = useState({
        shopName: "",
        dealerCode: "",
        // email: "",
        // phone: "",
        city: "",
        state: "",
        area: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            alert("Please login to submit warranty request");
            navigate("/login");
            return;
        }

        const requestData = {
            shopName: formData.shopName,
            dealerCode: formData.dealerCode,
            // email: formData.email,
            // phone: formData.phone,
            address: {
                city: formData.city,
                state: formData.state,
                area: formData.area
            }
        };

        try {

            setLoading(true);

            const response = await axios.post(
                `${apiUrl}/distributor/request`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            setAlertData({type: "success", message: "Distributor Registered Successfully!"});
            

            // ✅ Clear form after success
            setFormData({
                shopName: "",
                dealerCode: "",
                city: "",
                state: "",
                area: ""
            });

        } catch (error) {

            if (error.response && error.response.data) {
                const { errorMessage } = error.response.data;

                setAlertData({
                    type: "error",
                    message: errorMessage || "Something went wrong"
                });
            } else if (error.request) {
                setAlertData({type: "error", message: "Server not responding"});
            } else {
                setAlertData({type: "error", message: "Unexpected error occurred"});
            }

        } finally {
            setLoading(false); // 👈 stop loading always
        }
    };

    return (
        <section className='distributer-warranty'>
            {loading && <Loading message="Submitting request..." />}
            {alertData && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => setAlertData(null)}
                />
            )}
            <h1>Distributor Registration</h1>
            <form onSubmit={handleSubmit} className='distributer-warranty-form'>
                <div className="form-group">
                    <label htmlFor="shopName">Shop Name</label>
                    <input type="text" id="shopName" value={formData.shopName} onChange={handleChange} placeholder='Enter your shop name' />
                </div>
                <div className="form-group">
                    <label htmlFor="dealerCode">Dealer Code</label>
                    <input type="text" id="dealerCode" value={formData.dealerCode} onChange={handleChange} placeholder='Enter your dealer code' />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder='Enter email address' required />
                </div> */}
                {/* <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" value={formData.phone} onChange={handleChange} placeholder='Enter your phone number' />
                </div> */}
                <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input type="text" id="city" value={formData.city} onChange={handleChange} placeholder='Enter your city' />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input type="text" id="state" value={formData.state} onChange={handleChange} placeholder='Enter your state' />
                </div>
                <div className="form-group full">
                    <label htmlFor="area">Area</label>
                    <input type="text" id="area" value={formData.area} onChange={handleChange} placeholder='Enter your area' />
                </div>
                <button type="submit" className="submit-btn">
                    Register
                </button>
            </form>
        </section>
    )
}

export default DistributerWarranty