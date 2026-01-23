import React from 'react'
import HeroImage from '../assets/Product-Details-Hero-Image.png';
import '../components/ProductDetailHero.css';

const ProductDetailHero = () => {
    return (
        <section className='product-detail-hero-section container'>
            <div className='product-detail-hero-info-container'>
                <h1 className='product-detail-hero-info-heading'>Need help choosing the <span>perfect battery?</span></h1>
                <p className='product-detail-hero-info-subheading'>Our Experts are available to guide you through technical specifications and find the right match for your vehicle's requirements.</p>
                <div className='hero-btns'>
                    <button className='primary-btn'>Chat with Expert</button>
                    <button className='secondary-btn'>Call Expert</button>
                </div>
            </div>
            <div className='product-detail-hero-image-container'>
                <img src={HeroImage} alt="" />
            </div>
        </section>
    )
}

export default ProductDetailHero