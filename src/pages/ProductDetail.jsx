import React from 'react'
import './ProductDetail.css';
import thumbnail1 from '../assets/ThumbnailImages/thumbnail1.png';
import thumbnail2 from '../assets/ThumbnailImages/thumbnail2.png';
import thumbnail3 from '../assets/ThumbnailImages/thumbnail3.png';
import thumbnail4 from '../assets/ThumbnailImages/thumbnail4.png';
import iamge2 from '../assets/ProductImages/image2.png';
import Contact from '../components/Contact';
import ProductDetailHero from '../components/ProductDetailHero';
import { useParams } from 'react-router-dom';
import products from '../data/products';

const ProductDetail = () => {
    const { id } = useParams();

    // 🔍 product find by id
    const product = products.find(p => p.id === Number(id));
    console.log("first", id);

    // ❌ safety check
    if (!product) {
        return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
    }

    return (
        <>
            <section className='product-details-container container'>
                <div className="product-image-section">
                    <img src={product.image} alt="Product Name" />
                    <div className="thumbnail-images">
                        {product.thumbnails.map((img, index) => (
                            <img key={index} src={img} alt="thumbnail" />
                        ))}
                    </div>
                </div>

                <div className="product-info-section">
                    <div className="ratings">
                        <div className='ratings-icons-container'>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                        </div>
                        <span>11 Reviews</span>
                    </div>

                    <div className="product-info-content">
                        <h1 className='product-title'>{product.name}</h1>
                        <p className='product-description'>{product.description}</p>
                        <p className='product-price'>₹ {product.price}</p>
                    </div>
                    <hr />
                    <div className="product-addtional-info">
                        <div className='meta-box'><span>CCA Rating</span><p className='meta-value'>{product.amps}</p></div>
                        <div className='meta-box'><span>Voltage </span><p className='meta-value'>12 Volts</p></div>
                        <div className='meta-box'><span>Capacity (C10) </span><p className='meta-value'>{product.capacity} Ah</p></div>
                        <div className='meta-box'><span>Warranty </span><p className='meta-value'>{product.warranty}</p></div>
                    </div>
                    <button className='find-dealer-btn'>Find a Dealer</button>
                </div>
            </section>
            <ProductDetailHero />
            <Contact />
        </>
    )
}

export default ProductDetail