import React from 'react'
import './ViewWarranty.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const ViewWarranty = () => {
    return (
        <section className='view-warranty'>
            <h1>View Warranty</h1>
            <form action="" className='container view-warranty-form'>
                <div className="form-group full">
                    <label htmlFor="serialNumber">Battery Serial Number</label>
                    <input type="text" id="serialNumber" placeholder='Enter battery serial number' />
                </div>
                <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="text" id="mobileNumber" placeholder='Enter registered mobile number' />
                </div>
                <div className="form-group">
                    <label htmlFor="purchaseDate">Date of Purchase</label>
                    <input type="date" id="purchaseDate" placeholder='DD/MM/YY' />
                </div>
                <button type="submit" className="submit-btn">
                    Submit
                </button>
            </form>
        </section>
    )
}

export default ViewWarranty