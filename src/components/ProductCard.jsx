import React from 'react'
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="product-card">
      <div className='product-img-container'>
        <img src={product.image} alt={product.name} />
      </div>

      <div className="product-content-container">
        <h3 className='title'>{product.name}</h3>
        <p className='descritpion-1'>Engineered for high-end computer bikes with advanced vibration resistance.</p>
        <p className="price">₹ {product.price.toLocaleString("en-IN")}</p>

        <div className="meta">
          <div className='meta-box-1'><span>CCA: Performance</span><p className='meta-value'>{product.amps}</p></div>
          <div className='meta-box-1'><span>Warranty </span><p className='meta-value'>{product.warranty}</p></div>
        </div>

        <button className="btn" onClick={() => navigate(`/product/${product.id}`)}>View Details</button>
      </div>
    </div>
  );
};

export default ProductCard;