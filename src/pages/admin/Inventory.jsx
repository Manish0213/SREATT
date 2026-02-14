import React from "react";
import "./Inventory.css";
import image3 from '../../assets/ProductImages/image3.png';
import image4 from '../../assets/ProductImages/image4.png';
import image5 from '../../assets/ProductImages/image5.png';
import image6 from '../../assets/ProductImages/image6.png';

const Inventory = () => {
    const products = [
        {
            name: "SREATT Gold MT-7 Pro Max X-120",
            sku: "BAT-MC-001",
            stock: 850,
            price: 2450,
            status: "in-stock",
            capacity: 85,
            image: image3
        },
        {
            name: "Pro Max X-120",
            sku: "BAT-INV-229",
            stock: 12,
            price: 14200,
            status: "critical",
            capacity: 8,
            image: image4
        },
        {
            name: "SREATT Silver S-65",
            sku: "BAT-CAR-045",
            stock: 420,
            price: 5800,
            status: "in-stock",
            capacity: 42,
            image: image5
        },
        {
            name: "Titanium M-X",
            sku: "BAT-CAR-TITAN",
            stock: 92,
            price: 9800,
            status: "in-stock",
            capacity: 15,
            image: image6
        },
    ];

    return (
        <div className="inventory-wrapper">
            {/* Top Bar */}
            <div className="topbar">
                <input
                    type="text"
                    placeholder="Search SKU, series or specifications..."
                />
                <div className="topbar-actions">
                    <button className="add-btn">+ Add New SKU</button>
                </div>
            </div>

            {/* Header */}
            <div className="inventory-header">
                <div>
                    <h2>Inventory Management</h2>
                    <p>Monitor and manage your premium battery stock across all categories.</p>
                </div>
                {/* <div className="header-actions">
                    <button className="filter-btn">Filter</button>
                    <button className="export-btn">Export CSV</button>
                </div> */}
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <p>TOTAL STOCK</p>
                    <h2>14,280 <span className="green">+12%</span></h2>
                </div>

                <div className="stat-card">
                    <p>LOW STOCK ALERTS</p>
                    <h2 className="red">18 <span>Action Required</span></h2>
                </div>

                <div className="stat-card">
                    <p>ACTIVE SKUs</p>
                    <h2>142 <span>across 4 categories</span></h2>
                </div>

                <div className="stat-card">
                    <p>INVENTORY VALUE</p>
                    <h2>₹2.4M <span>Estimated</span></h2>
                </div>
            </div>

            {/* Tabs */}
            <div className="tabs">
                <span className="active-tab">All Batteries</span>
                <span>Motorcycle</span>
                <span>Car & Automotive</span>
                <span>Inverter & Solar</span>
                <span>E-Rickshaw</span>
            </div>

            {/* Product Cards */}
            <div className="product-grid">
                {products.map((item, index) => (
                    <div
                        key={index}
                        className={`product-card ${item.status === "critical" ? "critical-border" : ""
                            }`}
                    >
                        <div className="product-left">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="product-image"
                            />
                        </div>

                        <div className="product-right">

                            <div className="product-top">
                                <h3>{item.name}</h3>

                                <div className="card-actions">
                                    <span
                                        className={`badge ${item.status === "critical" ? "badge-red" : "badge-green"
                                            }`}
                                    >
                                        {item.status === "critical"
                                            ? "CRITICALLY LOW"
                                            : "IN STOCK"}
                                    </span>

                                    <div className="menu-container">
                                        <button
                                            className="dots-btn"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const menu = e.currentTarget.nextSibling;
                                                menu.classList.toggle("show-menu");
                                            }}
                                        >
                                            ⋮
                                        </button>

                                        <div className="dropdown-menu">
                                            <button className="edit-btn">Edit</button>
                                            <button className="delete-btn">Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="sku">SKU: {item.sku}</p>

                            <div className="product-info">
                                <div>
                                    <small>CURRENT STOCK</small>
                                    <h4>{item.stock} Units</h4>
                                </div>
                                <div>
                                    <small>UNIT PRICE</small>
                                    <h4>₹{item.price}</h4>
                                </div>
                            </div>

                            <div className="capacity-bar">
                                <div
                                    className="fill"
                                    style={{
                                        width: `${item.capacity}%`,
                                        backgroundColor:
                                            item.capacity < 20
                                                ? "#ef4444"     // 🔴 Red (critical)
                                                : item.capacity < 50
                                                    ? "#f59e0b"     // 🟠 Orange (medium)
                                                    : "#22c55e",    // 🟢 Green (good)
                                    }}
                                ></div>
                            </div>
                            {/* <small>Warehouse Capacity {item.capacity}%</small> */}
                            <div className="capacity-text">
                                <span className="capacity-label">WAREHOUSE CAPACITY</span>
                                <span className="capacity-value" style={{
                                    color:
                                        item.capacity < 20
                                            ? "red"
                                            : item.capacity < 50
                                                ? "orange"
                                                : "green",
                                }}>{item.capacity}%</span>
                            </div>

                        </div>
                    </div>
                ))}

                <div className="add-sku-card">
                    <span>＋</span>
                    <p>Add New SKU</p>
                </div>
            </div>
        </div>
    );
};

export default Inventory;
