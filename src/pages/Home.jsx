import React from 'react'
import Navbar from '../components/Navbar';
import HeroImage from '../assets/hero-image.png';
import PromiseLogo1 from '../assets/promise-logo-1.png';
import PromiseLogo2 from '../assets/promise-logo-2.png';
import PromiseLogo3 from '../assets/promise-logo-3.png';
import company1logo from '../assets/company-1.png';
import company2logo from '../assets/company-2.png';
import company3logo from '../assets/company-3.png';
import company4logo from '../assets/company-4.png';
import company5logo from '../assets/company-5.png';
import company6logo from '../assets/company-6.png';
import company7logo from '../assets/company-7.png';
import gaspipe from '../assets/gas-pipe.png';
import calcium from '../assets/calcium.png';
import electricar from '../assets/electric-car.png';
import grid from '../assets/grid.png';
import padlock from '../assets/padlock.png';
import car from '../assets/car.png';
import location from '../assets/location.png';
import map from '../assets/map.png';
import bg from '../assets/bg.png'
import featureImgRes1 from '../assets/feature-image-res-1.png';
import featureImgRes2 from '../assets/feature-image-res-2.png';
import vehicleLogo2 from '../assets/vehicle-logo-2.png';
import vehicleLogo3 from '../assets/vehicle-logo-3.png';
import vehicleLogo4 from '../assets/vehicle-logo-4.png';
import vehicleLogo5 from '../assets/vehicle-logo-5.png';
import vehicleLogo6 from '../assets/vehicle-logo-6.png';
import vehicleLogo7 from '../assets/vehicle-logo-7.png';
import vehicleLogo8 from '../assets/vehicle-logo-8.png';

import '../pages/Home.css';
import '../pages/HomeMediaQueries.css';

import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* hero section */}
            <secton class="hero-section">
                <div class="hero-container">
                    <img class="hero-image" src={HeroImage} />
                    <div class="hero-content flex">
                        <h2>Power That Never Stops</h2>
                        <p>
                            Premium high-performance batteries engineered for motorcycles built to deliver instant ignition, long life, and unmatched reliability.
                        </p>
                        <div className="hero-buttons flex">
                            <button className="primary-button hero-btn">Explore Motocycle Batteries</button>
                            <button className="secondary-button hero-btn">Learn More</button>
                        </div>
                    </div>
                </div>
            </secton>

            {/* brand-promise-secton */}
            <section class="brand-promise-section">
                <div class="brand-promise-text flex container">
                    <h2>Brand Promise Section</h2>
                    <p className="para-1">At SREATT, we believe power is more than voltage - it's confidence, consistency and commitment.</p>
                    <p className="para-2">Our betteries are designed using advanced technology, rugged materials, and strict quanlity control to withstand tough roads, harsh weather, and long journeys.</p>
                </div>
                <div className="promise-card-container container flex">
                    <div className="promise-card flex">
                        <img className='card-logo' src={PromiseLogo1} />
                        <h4 className='card-title'>Unmatched Reliability</h4>
                        <p className='card-description'>Build to last and perform under the most demanding conditions.</p>
                    </div>

                    <div className="promise-card flex">
                        <img className='card-logo' src={PromiseLogo2} />
                        <h4 className='card-title'>Peak Performance</h4>
                        <p className='card-description'>Delivering maximum cranking power when you need it most.</p>
                    </div>

                    <div className="promise-card flex">
                        <img className='card-logo' src={PromiseLogo3} />
                        <h4 className='card-title'>Advanced Engineering</h4>
                        <p className='card-description'>Leveraging cutting-edge technology for superior efficiency and lifespan.</p>
                    </div>
                </div>
            </section>

            {/* feature section */}
            <section class="feature-section flex">
                <div className="content-left flex">
                    <h1 className='feature-heading'>Motorcycle Batteries</h1>
                    <p class="content-desc" >SREATT motorcycle batteries are specially designed for modern two-wheelers. Whether it's a computer bike, sports motocycle, or premium touring machine - our btteries provide:</p>

                    <ul className='feature-list'>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>High Cranking Power for instant cold-start ignition</span></li>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>Vibration-Resistant Design for rough roads</span></li>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>Maintenance-Free Performance with long service life</span></li>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>All-Weather Reliability - from head to winter starts</span></li>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>Advanced Lead-Calcim Technology for slow discharge and consistent power</span></li>
                    </ul>
                </div>
                <div className="content-right">
                    <img src={featureImgRes1} />
                </div>
            </section>

            {/* company section */}
            <section class="companies-section">
                <div className="companies-header">Trusted by nearly 500K paying customers</div>
                <div className="logos flex">
                    <img src={vehicleLogo2} class="logo" alt="" />
                    <img src={vehicleLogo3} class="logo" alt="" />
                    <img src={vehicleLogo4} class="logo" alt="" />
                    <img src={vehicleLogo5} class="logo" alt="" />
                    <img src={vehicleLogo6} class="logo" alt="" />
                    <img src={vehicleLogo7} class="logo" alt="" />
                    <img src={vehicleLogo8} class="logo" alt="" />
                </div>
            </section>

            {/* feature section */}
            <section class="feature-section flex" id='feature-section-2'>
                <div className="content-left flex">
                    <h1 className='feature-heading'>Other Battery Categories</h1>
                    <p class="content-desc" >While motorcycles are our core strength, we also manufacture a wide range of premium power solutions:</p>

                    <ul className='feature-list'>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>Scooter Batteries Compact, zero-maintenance, long backup</span></li>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>Car Batteries High crank, fast recharge, long life</span></li>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>Inverter & Solar Batteries Deep-cycle reliability, high storage capacity</span></li>
                        <li className='feature-item flex'><i class="fa-solid fa-check"></i> <span>E-Rickshaw & Commercial Batteries Heavy-duty, fast charging, reinforced lifespan</span></li>
                    </ul>
                </div>
                <div className="content-right">
                    <img src={featureImgRes2} />
                </div>
            </section>

            {/* technology section */}
            <section className='technology-section'>
                <div className='technology-section-text'>
                    <h1>Technology Behind SREATT</h1>
                    <p>Our batteries are built with cutting-edge technology to ensure maximum efficiency, safety, and lifespan.</p>
                </div>
                <div className="technology-section-cards flex">
                    <div className="card flex">
                        <img src={gaspipe} />
                        <h2>VRLA Design</h2>
                        <p>Valve Regulated Lead Acid technology ensures safe opertation without leakage. The sealed constuction allows for flexible installtion and zero water topping.</p>
                    </div>
                    <div className="card flex">
                        <img src={calcium} />
                        <h2>Pure Lead-Calcium</h2>
                        <p>Advanced alloy plates significantly reduce corrosion and water loss, extending shelf life and ensuring consistent performance in extreme temperatures.</p>
                    </div>
                    <div className="card flex">
                        <img src={electricar} />
                        <h2>AGM Technology</h2>
                        <p>Absorbent Glass Mat separators absorb the electrolyte, lowering internal resistance for higher current delivery and faster recharge capabilities.</p>
                    </div>
                    <div className="card flex">
                        <img src={grid} />
                        <h2>Heat-Resistant Grid Structure</h2>
                        <p>Designed with a heat-resistant grid structure that efficiently dissipates heat, ensuring stable performance, enhanced safety, and longer bettery life even under extreme riding conditions.</p>
                    </div>
                </div>
            </section>

            <section className='hero-section-two'>
                <div className="hero flex">
                    <div className="hero-left">
                        <h1 className='hero-left-heading'>Dealer & Distributer Network</h1>
                        <p className='hero-left-desc'>We are expanding rapidly across India with strong supply chain support, taining, and dealer benefits.</p>
                        <span>Interest in joining us?</span>
                        <div className='btns flex'>
                            <a href="#" class="primary-button" onClick={() => navigate(`/distributer-warranty`)}>Become a Dealer</a>
                            <a href="#" class="secondary-2-button">Wholesale Enquiry</a>
                        </div>
                    </div>
                    <div className="hero-right">
                        <img src={car} alt="hero image"></img>
                    </div>
                </div>
            </section>

            {/* locater section */}
            <section className="location-section">
                <div className="location-text-content">
                    <h1 className='location-text-heading'>Find SREATT Near You</h1>
                    <p className='location-text-subheading'>Enter your location and find authorized service points and dealer stores nearby.</p>
                </div>
                <div className="location-map-section">
                    <div class="search-input">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="City, State, or Zip Code" />
                        <button class="search-btn">Find a Store</button>
                    </div>

                    {/* map */}
                    <div class="map-wrapper">
                        <img src={map} className='map-image' alt="Store Location Map" />
                        <img src={location} className='location-image' alt="" />
                    </div>
                </div>
            </section>

            {/* <div className="spacer" style={{ height: "100vh" }}></div> */}
        </>
    )
}