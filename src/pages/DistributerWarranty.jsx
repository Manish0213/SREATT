import React from 'react'
import './DistributerWarranty.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DistributerWarranty = () => {
    return (
        <section className='distributer-warranty'>
            <h1>Distributor Registration</h1>
            <form action="#" className='container distributer-warranty-form'>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" placeholder='Enter your first name' />
                </div>
                <div className="form-group">
                    <label htmlFor="LastName">Last Name</label>
                    <input type="text" id="LastName" placeholder='Enter your last name' />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" placeholder='Enter email address' />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input type="email" id="phone" placeholder='Enter your phone number' />
                </div>
                <div className="form-group full">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" placeholder='Enter your address' />
                </div>
                <button type="submit" className="submit-btn">
                    Register
                </button>
            </form>
        </section>
    )
}

export default DistributerWarranty