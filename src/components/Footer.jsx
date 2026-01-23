import React from 'react'
import logo from "../assets/logo.png";
import './Footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className="container flex footer-container">
                <a href="#" class="company-logo">
                    <img src={logo} alt="company logo" />
                </a>
                <div class="link-column flex">
                    <h4>Company</h4>
                    <a href="#" class="hover-link">About</a>
                    <a href="#" class="hover-link">Products</a>
                    <a href="#" class="hover-link">Contact</a>
                    <a href="#" class="hover-link">Warranty</a>
                </div>
                <div class="link-column flex">
                    <h4>Legal</h4>
                    <a href="#" class="hover-link">About</a>
                    <a href="#" class="hover-link">Products</a>
                    <a href="#" class="hover-link">Contact</a>
                </div>
                <div class="link-column flex">
                    <h4>Reach us</h4>
                    <a href="#" class="hover-link"><i class="fa-solid fa-phone"></i> +91 9302050250</a>
                    <a href="#" class="hover-link"><i class="fa-solid fa-message"></i> info@sreatt.com</a>
                </div>
                <div class="link-column flex">
                    <h4>Follow Us</h4>
                    <div>
                        <a href="#" class="hover-link"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="hover-link"><i class="fa-solid fa-globe"></i></a>
                        <a href="#" class="hover-link"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" class="hover-link"><i class="fa-brands fa-youtube"></i></a>
                    </div>
                </div>
            </div>
            <div className="container horizontal-container flex">
                <hr className='footer-bar'/>
                <span className="footer-caption"><i className="fa-regular fa-copyright"></i> SREATT Batteries. All rights reserved.</span>
            </div>
        </footer>
    )
}

export default Footer