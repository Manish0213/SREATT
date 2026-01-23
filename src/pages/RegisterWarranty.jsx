import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './RegisterWarranty.css'

const RegisterWarranty = () => {
    return (
        <section className='register-warranty'>
            <h1>Register Warranty</h1>
            <form className="register-warranty-form">
                <div className="form-group full">
                    <label htmlFor="dealer">Dealer Name</label>
                    <input type="text" id="dealer" placeholder='Enter dealer name' />
                </div>

                <div className={`form-group ${window.innerWidth > 768 ? 'full' : ''}`}>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder='Enter address' />
                </div>

                <div className="form-group">
                    <label htmlFor="customerName">Customer Name</label>
                    <input type="text" id="customerName" placeholder='Enter customer name' />
                </div>

                <div className="form-group">
                    <label htmlFor="mobileNumber">Customer Mobile Number</label>
                    <input type="text" id="mobileNumber" placeholder='Enter mobile number' />
                </div>

                <div className="form-group">
                    <label htmlFor="vehicleType">Vehicle Type</label>
                    <input type="text" id="vehicleType" placeholder='Enter vehicle type' />
                </div>

                <div className="form-group">
                    <label htmlFor="purchaseDate">Date of Purchase</label>
                    <input type="date" id="purchaseDate" placeholder='Enter purchase date' />
                </div>

                <div className="form-group">
                    <label htmlFor="modelNumber">Battery Model Number</label>
                    <input type="text" id="modelNumber" placeholder='Enter model number' />
                </div>

                <div className="form-group">
                    <label htmlFor="serialNumber">Battery Serial Number</label>
                    <input type="text" id="serialNumber" placeholder='Enter serial number' />
                </div>
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </section>
    )
}

export default RegisterWarranty