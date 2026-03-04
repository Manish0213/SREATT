import React, { useState } from 'react'
import logo from "../assets/logo.png";
import './Navbar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setMenuOpen(false);
        navigate("/login");
    };

    return (
        <nav class="navbar">
            <div class="container main-nav flex">
                <a href="" class="company-logo">
                    <img src={logo} alt="company logo" />
                </a>
                <div className={`nav-content flex ${menuOpen ? "active" : ""}`}>
                    <div class="nav-links">
                        <ul class="flex">
                            <li><Link to="/" class="hover-link" onClick={closeMenu}>Home</Link></li>
                            {/* <li><Link to="/about" class="hover-link">About</Link></li> */}
                            <li><Link to="/product" class="hover-link" onClick={closeMenu}>Products</Link></li>
                            <li><Link to="/register-warranty" class="hover-link" onClick={closeMenu}>Register Warranty</Link></li>
                            <li><Link to="/view-warranty" class="hover-link" onClick={closeMenu}>View Warranty</Link></li>
                            <li><Link to="contact-us" class="hover-link" onClick={closeMenu}>Contact</Link></li>
                        </ul>
                    </div>
                    <ul className="nav-btns flex">
                        {/* <li><Link to="/login" class="hover-link secondary-button">Login</Link></li> */}
                        {!token ? (
                            <li onClick={closeMenu}>
                                <Link to="/login" className="hover-link secondary-button">
                                    Login
                                </Link>
                            </li>
                        ) : (
                            <li onClick={handleLogout}>
                                <Link
                                    className="hover-link secondary-button"
                                >
                                    Logout
                                </Link>
                            </li>
                        )}
                        <li onClick={closeMenu}><Link to="/distributer-warranty" class="hover-link primary-button">Be a Distributer</Link></li>
                    </ul>
                </div>

                {/* <span onClick={() => setMenuOpen(!menuOpen)}><i class="fa-solid fa-bars"></i></span> */}
                <span onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? (
                        <i class="fa-solid fa-x"></i>   // Cross icon
                    ) : (
                        <i className="fa-solid fa-bars"></i>    // Hamburger icon
                    )}
                </span>
            </div>
        </nav>
    )
}

export default Navbar