import React from 'react'
import aboutSlider from '../assets/about-slider.png';
import './About.css';
import './AboutMediaQuries.css';
import About_Feature_Img1 from '../assets/About_Feature_Img1.png';
import Contact from '../components/Contact';
import logo11 from '../assets/logo11.png';
import logo12 from '../assets/logo12.png';
import logo13 from '../assets/logo13.png';
import logo14 from '../assets/logo14.png';
import logo10 from '../assets/logo10.png';
import AboutHeroSection from '../components/AboutHeroSection';

const About = () => {
  return (
    <div className='about'>
      <section className="about-slider">
        <h1>About</h1>
        <p>SREATT is a proudly Indian battery and lubricant manufacturing brand dedicated to delivering high-performance, durable, and reliable power solutions. With fully controlled in-house production, advanced testing facilities, and innovative engineering, SREATT stands for quality that performs in real-world conditions.</p>
      </section>

      <section className="about-section-2">
        <div className='about-section-2-container'>
          <h2>Our Journey Began With a Mission</h2>
          <p>To create long-lasting batteries engineered specifically for Indian vehicles, Indian roads, and Indain climate conditions.</p>
          <p>Today, SREATT has become a trusted choice for riders, vehicle owners, workshops, and industries across India -- not as a reseller, but as a true manufacturer.</p>
        </div>
      </section>

      <section className="about-feature-section-1">
        <div className='container about-feature-section-container'>
          <div className="about-feature-content">
            <h1>Japanese Technology Excellence</h1>
            <p>From raw materials to final product -- every step happens under our roof, ensuring consitency, reliability and superior performance.</p>
            <p className="about-item-header">At SREATT, every battery is Japanese Technology with:</p>
            <div className='about-feature-item-container flex'>
              <div className="about-feature-item flex"><div className='bullet'>1</div> <div>High-purity lead and calcium alloys</div></div>
              <div className='about-feature-item flex'><div className='bullet'>2</div> <div>Modern AGM & VRLA technology</div></div>
              <div className="about-feature-item flex"><div className='bullet'>3</div> <div>Vibration-resistant, sealed designs</div></div>
              <div className="about-feature-item flex"><div className='bullet'>4</div> <div>Corrosion-proof terminals</div></div>
              <div className="about-feature-item flex"><div className='bullet'>5</div> <div>Strict performance and quality testing</div></div>
            </div>
          </div>
          <div className='about-feature-img-container'>
            <img src={About_Feature_Img1} alt="" />
          </div>
        </div>
      </section>

      {/* commitment-section */}
      <section className='commitment-section'>
        <div className='container commitment-content flex'>
          <h1>Our Commitment</h1>
          <h3>SREATT is more than a supplier -- we're a performance partner.</h3>
          <p>We continuosly innovate and improve our manufacturing process to deliver products that meet tha needs of today and the exceptations of tommorrow.</p>
        </div>
      </section>

      <section classname="whychoosesreatt">
        <h2 className='whychoosesreatt-heading container'>Why Choose SREATT?</h2>

        <div className="container whychoosesreatt-container flex">
          <div className="whychoosesreattcard flex">
            <img src={logo10} alt="" />
            <div className='whychoosesreattcardconent flex'>
              <h4>100% In-House Manufacturing</h4>
              <p>Full control and consistent performance that keeps your workflow smooth and reliable every day.</p>
            </div>
          </div>

          <div className="whychoosesreattcard flex">
            <img src={logo11} alt="" />
            <div className='whychoosesreattcardconent flex'>
              <h4>100% In-House Manufacturing</h4>
              <p>Full control and consistent performance that keeps your workflow smooth and reliable every day.</p>
            </div>
          </div>

          <div className="whychoosesreattcard flex">
            <img src={logo12} alt="" />
            <div className='whychoosesreattcardconent flex'>
              <h4>100% In-House Manufacturing</h4>
              <p>Full control and consistent performance that keeps your workflow smooth and reliable every day.</p>
            </div>
          </div>

          <div className="whychoosesreattcard flex">
            <img src={logo13} alt="" />
            <div className='whychoosesreattcardconent flex'>
              <h4>100% In-House Manufacturing</h4>
              <p>Full control and consistent performance that keeps your workflow smooth and reliable every day.</p>
            </div>
          </div>

          <div className="whychoosesreattcard flex">
            <img src={logo14} alt="" />
            <div className='whychoosesreattcardconent flex'>
              <h4>100% In-House Manufacturing</h4>
              <p>Full control and consistent performance that keeps your workflow smooth and reliable every day.</p>
            </div>
          </div>

        </div>
      </section>
      
      <Contact />
    </div>
  )
}

export default About