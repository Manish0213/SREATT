import React from "react";
import "./AboutHeroSection.css";

import batteryImg1 from "../assets/battery-car.png";
import batteryImg2 from "../assets/battery-pack.png";
import lubricantImg1 from "../assets/lubricant-engine.png";
import lubricantImg2 from "../assets/lubricant-pack.png";

const AboutHeroSection = () => {
  return (
    <section className="our-products-section">
      <h2 className="section-title">Our Products</h2>

      <div className="products-grid">
        {/* LEFT – LUBRICANTS */}
        <div className="product-card left">
          <div className="images-stack">
            <img src={batteryImg1} alt="Battery Engine" />
            <img src={batteryImg2} alt="Battery Pack" className="floating-img" />
          </div>

          <h3>Lubricants</h3>
          <p>
            Our lubricants are engineered to reduce friction, improve efficiency,
            and extend engine life — suitable for two-wheelers, four-wheelers,
            and industrial machinery.
          </p>
        </div>

        {/* RIGHT – BATTERIES */}
        <div className="product-card right">
          <h3>Batteries</h3>
          <h4>Built in Our Manufacturing Unit</h4>

          <p>
            Our batteries are developed for vehicles and machines that demand
            power and endurance. Designed for:
          </p>

          <ul>
            <li>✔ Motorcycles & Scooters</li>
            <li>✔ Cars & SUVs</li>
            <li>✔ Commercial Vehicles & Trucks</li>
            <li>✔ Solar & Inverter Systems</li>
            <li>✔ Industrial & Utility Equipment</li>
          </ul>

          <p className="highlight-text">
            With features like high cranking power, fast ignition response, and
            long battery life, SREATT batteries deliver confidence with every
            start.
          </p>

          <div className="images-stack bottom">
            <img src={lubricantImg1} alt="Lubricant Flow" />
            <img src={lubricantImg2} alt="Lubricant Pack" className="floating-img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
