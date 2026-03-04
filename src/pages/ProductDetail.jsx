import React from 'react'
import { useState, useEffect } from 'react';
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
import axios from 'axios';

const ProductDetail = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { serialno } = useParams();

    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔍 product find by id
    // const product = products.find(p => p.id === Number(id));
    // console.log("first", id);

    // ❌ safety check
    // if (!product) {
    //     return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
    // }

    // 👇 default main image = first image
    // const [selectedImage, setSelectedImage] = useState(product.images[0]);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(
                `${apiUrl}/api/products/serial/${serialno}`
            );

            setProduct(response.data);
            setSelectedImage(response.data.images[0]);
            setLoading(false);

        } catch (error) {
            console.error("Error fetching product:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [serialno]);

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    if (!product) {
        return <h2 style={{ textAlign: "center" }}>Product Not Found</h2>;
    }

    return (
        <>
            <section className='product-details-container container'>
                <div className="product-image-section">
                    {/* <img src={selectedImage} alt="Product Name" /> */}
                    <div className="main-image-wrapper">
                        <img src={selectedImage} alt="Product Name" />
                    </div>
                    <div className="thumbnail-images">
                        {product.images.map((img, index) => (
                            <img key={index} src={img} alt="thumbnail" onClick={() => setSelectedImage(img)} />
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
                        <div className='meta-box'><span>CCA Rating</span><p className='meta-value'>{product.cca}</p></div>
                        <div className='meta-box'><span>Voltage </span><p className='meta-value'>{product.voltage} Volts</p></div>
                        <div className='meta-box'><span>Capacity (C10) </span><p className='meta-value'>{product.ampHours} Ah</p></div>
                        <div className='meta-box'><span>Warranty </span><p className='meta-value'>{product.warrantyMonths} Months</p></div>
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