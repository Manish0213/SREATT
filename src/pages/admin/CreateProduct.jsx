import React from "react";
import "./CreateProduct.css";
import { useState } from "react";

const CreateProduct = () => {

    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        // append new images
        setImages((prev) => [...prev, ...files]);

        // same file dobara select karne ke liye
        e.target.value = null;
    };

    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="create-product">
            {/* Header */}
            <div className="cp-header">
                <div>
                    <h1>Upload New Battery Product</h1>
                    <p>Add technical specifications and pricing for a new vehicle battery unit.</p>
                </div>

                <div className="cp-actions">
                    <button className="btn-outline">Save Draft</button>
                    <button className="btn-primary">Publish Product</button>
                </div>
            </div>

            {/* Top Sections */}
            <div className="cp-grid">
                {/* Basic Info */}
                <div className="cp-card">
                    <h3><i className="fa-solid fa-circle-info"></i> Basic Information</h3>

                    <label>Product Name</label>
                    <input placeholder="e.g. DieHard Platinum AGM Group 35" />

                    <label>SKU Number</label>
                    <div className="sku-row">
                        <input placeholder="BT-9902-X1" />
                        <span className="auto-gen">AUTO-GEN</span>
                    </div>

                    <label>Brand</label>
                    <select>
                        <option>Select Brand</option>
                        <option>Exide</option>
                        <option>Amaron</option>
                    </select>

                    <label>Battery Chemistry</label>
                    <div className="radio-grid">
                        <label className="radio-card">
                            <input type="radio" name="chemistry" />
                            <span>AGM</span>
                        </label>

                        <label className="radio-card">
                            <input type="radio" name="chemistry" />
                            <span>Lead-Acid</span>
                        </label>

                        <label className="radio-card">
                            <input type="radio" name="chemistry" />
                            <span>Lithium</span>
                        </label>

                        <label className="radio-card">
                            <input type="radio" name="chemistry" />
                            <span>Gel Cell</span>
                        </label>
                    </div>

                </div>

                {/* Specifications */}
                <div className="cp-card">
                    <h3><i className="fa-solid fa-sliders"></i> Specifications</h3>

                    <div className="two-col">
                        <div className="specification-form-group">
                            <label>Voltage (V)</label>
                            <input placeholder="12" />
                        </div>

                        <div className="specification-form-group">
                            <label>CCA (@ 0°F)</label>
                            <input placeholder="850" />
                        </div>

                        <div className="specification-form-group">
                            <label>Amp Hours (AH)</label>
                            <input placeholder="70" />
                        </div>

                        <div className="specification-form-group">
                            <label>Reserve Cap (Min)</label>
                            <input placeholder="120" />
                        </div>
                    </div>

                    <label>Dimensions (L x W x H)</label>
                    <div className="three-col">
                        <input placeholder="9.1" />
                        <input placeholder="6.8" />
                        <input placeholder="8.9" />
                    </div>

                    <label>Terminal Position</label>
                    <div className="terminal-grid">
                        <button>LHP</button>
                        <button className="active">RHP</button>
                        <button>Top Post</button>
                    </div>
                </div>

                {/* Media & Pricing */}
                <div className="cp-card">
                    <h3><i className="fa-solid fa-image"></i> Media & Pricing</h3>

                    {/* Upload Box */}
                    <div className="upload-box">
                        <label className="upload-label">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                            />

                            <div className="upload-content">
                                Drop product images here <br />
                                <span>or browse files</span>
                            </div>
                        </label>
                    </div>

                    {/* Selected Images */}
                    {images.length > 0 && (
                        <div className="image-list">
                            {images.map((file, index) => (
                                <div key={index} className="image-item">
                                    <span className="image-name">{file.name}</span>

                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeImage(index)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="two-col">
                        <input placeholder="MSRP ($)" />
                        <input placeholder="Sale Price ($)" />
                    </div>

                    <label>Stock Quantity</label>
                    <div className="qty-row">
                        <button>-</button>
                        <span>48</span>
                        <button>+</button>
                    </div>

                    <label className="checkbox">
                        <input type="checkbox" /> Auto-replenish stock when low
                    </label>
                </div>
            </div>

            {/* Vehicle Compatibility */}
            <div className="cp-card full-card">
                <h3>Vehicle Compatibility</h3>

                <input
                    className="search"
                    placeholder="Search by Make, Model, or Year (e.g., 2018 Ford F-150)"
                />

                <div className="tags">
                    <span>2015–2022 Toyota Camry ✕</span>
                    <span>2010–2018 Honda Accord ✕</span>
                    <span>2020–2024 Ford Maverick ✕</span>
                    <span>2014–2019 Jeep Grand Cherokee ✕</span>
                </div>

                <button className="btn-outline">+ Import CSV Compatibility List</button>
            </div>
        </div>
    );
};

export default CreateProduct;