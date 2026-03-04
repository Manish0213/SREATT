import React from 'react'
import { useState, useEffect } from 'react'
import './RegisterWarranty.css'
import BarcodeScanner from '../components/BarcodeScanner';
import axios from 'axios';
import Alert from './admin/components/Alert';
import Loading from './admin/components/Loading';

const RegisterWarranty = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    // const [serialNumber, setSerialNumber] = useState("");
    const [showScanner, setShowScanner] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const [dealer, setDealer] = useState([]);

    const [formData, setFormData] = useState({
        dealerCode: "",
        purchaseDate: "",
        serialNo: "",
        city: "",
        state: "",
        area: ""
    });

    useEffect(() => {
        axios.get(`${apiUrl}/distributor/getAllDistributors`) // 👈 apna actual API lagana
            .then(res => {
                setDealer(res.data);
            })
            .catch(err => {
                console.error("Error fetching dealers", err);
            });
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const showAlert = (type, message) => {
        setAlertData({ type, message });

        setTimeout(() => {
            setAlertData(null);
        }, 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (!token) {
            // alert("Please login to submit warranty request");
            setAlertData({ type: "error", message: "Please login to submit warranty request" });
            // navigate("/login");
            return;
        }

        const role = localStorage.getItem("role");

        if (!role) {
            setAlertData({
                type: "error",
                message: "Please login to submit warranty request"
            });
            return;
        }

        if (role === "ADMIN") {
            setAlertData({
                type: "error",
                message: "You are an Admin. Warranty request not allowed."
            });
            return;
        }

        if (role === "DISTRIBUTOR") {
            setAlertData({
                type: "error",
                message: "You are already a Distributor."
            });
            return;
        }

        // Agar role USER hai tab aage ka logic chalega

        const requestData = {
            dealerCode: formData.dealerCode,
            purchaseDate: formData.purchaseDate,
            serialNo: formData.serialNo,
            address: {
                city: formData.city,
                state: formData.state,
                area: formData.area
            }
        };

        try {
            setLoading(true);

            const response = await axios.post(
                `${apiUrl}/warranty/register`,
                requestData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );

            showAlert("success", "Warranty Registered Successfully!");

            // ✅ Clear form
            setFormData({
                dealerCode: "",
                purchaseDate: "",
                serialNo: "",
                city: "",
                state: "",
                area: ""
            });

        } catch (error) {

            if (error.response && error.response.data) {
                const { errorMessage } = error.response.data;

                showAlert(
                    "error",
                    errorMessage || "Something went wrong"
                );
            }
            else if (error.request) {
                showAlert("error", "Server not responding");
            }
            else {
                showAlert("error", "Unexpected error occurred");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='register-warranty'>
            {loading && <Loading message="Registering warranty..." />}
            {alertData && (
                <Alert
                    type={alertData.type}
                    message={alertData.message}
                    onClose={() => setAlertData(null)}
                />
            )}
            <h1>Register Warranty</h1>
            <form className="register-warranty-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="dealerCode">Dealer</label>
                    <select
                        id="dealerCode"
                        value={formData.dealerCode}
                        // onChange={(e) => setDealerCode(e.target.value)}
                        onChange={handleChange}
                    >
                        <option value="">Select Dealer</option>

                        {dealer.map((dealer) => (
                            <option key={dealer.dealerCode} value={dealer.dealerCode}>
                                {dealer.dealerName} ({dealer.dealerCode})
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="purchaseDate">Date of Purchase</label>
                    <input type="date" id="purchaseDate" placeholder='Enter purchase date' value={formData.purchaseDate} onChange={handleChange} />
                </div>

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

                {/* <div className="form-group">
                    <label htmlFor="modelNumber">Battery Model Number</label>
                    <input type="text" id="modelNumber" placeholder='Enter model number' />
                </div> */}

                {/* Serial Number with QR Icon */}
                {/* <div className="form-group">
                    <label>Battery Serial Number</label>
                    <div className="barcode-input">
                        <input
                            type="text"
                            value={serialNumber}
                            placeholder="Scan or enter serial number"
                            onChange={(e) => setSerialNumber(e.target.value)}
                        />

                        <i
                            className="fa-solid fa-qrcode scan-icon"
                            onClick={() => setShowScanner(true)}
                        ></i>
                    </div>
                </div> */}

                <div className="form-group full">
                    <label>Battery Serial Number</label>
                    <div className="barcode-input">
                        <input
                            type="text"
                            id="serialNo"
                            value={formData.serialNo}
                            placeholder="Scan or enter serial number"
                            onChange={handleChange}
                        />

                        <i
                            className="fa-solid fa-qrcode scan-icon"
                            onClick={() => setShowScanner(true)}
                        ></i>
                    </div>
                </div>

                {showScanner && (
                    <BarcodeScanner
                        onDetected={(code) => {
                            setSerialNumber(code);
                            setShowScanner(false);
                        }}
                        onClose={() => setShowScanner(false)}
                    />
                )}

                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </section>
    )
}

export default RegisterWarranty