import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './ContactUs.css'

const ContactUs = () => {
    return (
        <section className='contact-section'>
            <h1>Contact Us</h1>
            <p class="subtitle">
                Your questions matter. Get in touch and we'll respond quickly.
            </p>
            <div className="contact-card container">

                <div className="contact-group flex">
                    {/* Left Info Panel */}
                    <div class="contact-info">
                        <h2>Contact Information</h2>
                        <p>Say something to start a live chat!</p>

                        <ul className='flex'>
                            <li><i class="fa-solid fa-phone"></i> +91 9302050250</li>
                            <li><i class="fa-solid fa-message"></i> info@sreatt.com</li>
                        </ul>

                        <div class="social-icons flex">
                            <a href="#" class="hover-link"><i class="fa-brands fa-instagram"></i></a>
                            <a href="#" class="hover-link"><i class="fa-solid fa-globe"></i></a>
                            <a href="#" class="hover-link"><i class="fa-brands fa-twitter"></i></a>
                            <a href="#" class="hover-link"><i class="fa-brands fa-youtube"></i></a>
                        </div>
                    </div>

                    {/* Right Contact Form */}
                    <form action="" className='contact-form'>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" placeholder='Enter your first name' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="LastName">Last Name</label>
                            <input type="text" id="LastName" placeholder='Enter your last name' />
                        </div>
                        <div className="form-group full">
                            <label htmlFor="email">Email Address</label>
                            <input type="email" id="email" placeholder='Enter email address' />
                        </div>
                        <div className="form-group full">
                            <label htmlFor="phone">Phone Number</label>
                            <input type="email" id="phone" placeholder='Enter your phone number' />
                        </div>
                        <div className="form-group full">
                            <label htmlFor="message">Address</label>
                            <textarea placeholder="Message" id="message"></textarea>
                        </div>
                        <button type="submit" className="submit-btn">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ContactUs