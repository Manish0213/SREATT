import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Inventory.css";
import image3 from '../../assets/ProductImages/image3.png';
import image4 from '../../assets/ProductImages/image4.png';
import image5 from '../../assets/ProductImages/image5.png';
import image6 from '../../assets/ProductImages/image6.png';
import { useNavigate } from "react-router-dom";
import Loading from '../admin/components/Loading';
import Alert from '../admin/components/Alert';

const Inventory = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const navigate = useNavigate();
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [activeTab, setActiveTab] = useState("ALL");
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const [openMenu, setOpenMenu] = useState(null);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);
    const [deletingSerial, setDeletingSerial] = useState(null); // 👈 which product is deleting

    // Pagination
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = 3;
    // const MAX_STOCK = 100;
    // const stockPercentage = (item.stock / MAX_STOCK) * 100;
    // const stockPercentage = Math.min((inventory.stock / MAX_STOCK) * 100, 100);

    const goPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    const goNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const getPageNumbers = () => {
        const totalVisible = 3;
        let start = Math.max(currentPage - 1, 1);
        let end = start + totalVisible - 1;

        if (end > totalPages) {
            end = totalPages;
            start = Math.max(end - totalVisible + 1, 1);
        }

        const pages = [];
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

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

    useEffect(() => {
        axios.get(`${apiUrl}/api/specifications/vehicle-types`)
            .then((res) => {
                setVehicleTypes(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        fetchProducts(currentPage, search);
    }, [currentPage, search]);

    const handleSearch = (e) => {
        setSearch(e.target.value);
        setCurrentPage(0);  // reset to first page
    };

    const fetchProducts = async (page, searchKeyword) => {
        try {
            const res = await axios.get(`${apiUrl}/api/products`, {
                params: {
                    page: page,
                    size: productsPerPage,
                    search: searchKeyword
                }
            });

            setInventory(res.data.content);
            setTotalPages(res.data.totalPages);

            console.log("Inventory data:", res.data.content);

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const fetchProductsByVehicleType = async (vehicleTypeId, page = 0) => {
        setActiveTab(vehicleTypeId);
        // setCurrentPage(page);

        try {
            const response = await fetch(
                `${apiUrl}/api/products/by-vehicle-type/${vehicleTypeId}?page=${page}&size=${productsPerPage}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();
            console.log("vehicle type data", data);
            setInventory(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error:", error);
            return [];
        }
    };

    const handleDelete = async (serialNo) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        const token = localStorage.getItem("token");

        if (!token) {
            setAlertData({ type: "error", message: "Session expired. Please login again." });
            // setTimeout(() => setAlertData(null), 4000);
            return;
        }

        try {
            setDeletingSerial(serialNo);   // 👈 specific card loading
            setLoading(true);

            await axios.delete(
                `${apiUrl}/api/products/serial/${serialNo}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setAlertData({ type: "success", message: "Product deleted successfully ✅" });

            setOpenMenu(null); // 🔥 menu close
            fetchProducts(currentPage, search);

        } catch (error) {
            console.error("Delete failed:", error);

            let message = "Failed to delete product";

            if (error.response?.status === 401) {
                message = "Unauthorized. Please login again.";
            } else if (error.response?.data?.errorMessage) {
                message = error.response.data.errorMessage;
            }

            setAlertData({ type: "error", message });

        } finally {
            setDeletingSerial(null);
            setLoading(false);
        }
    };

    return (
        <div className="inventory-wrapper">
            {alertData && <Alert type={alertData.type} message={alertData.message} onClose={() => setAlertData(null)}/>}
            {loading && <Loading message="Processing..." />}
            {/* Top Bar */}
            <div className="topbar">
                <input
                    type="text"
                    placeholder="Search SKU, series or specifications..."
                    value={search}
                    onChange={handleSearch}
                />
                <div className="topbar-actions">
                    <button className="add-btn" onClick={() => navigate("/admin/create-product")}>+ Add New SKU</button>
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
            {/* <div className="tabs">
                <span className="active-tab">All Batteries</span>
                <span>Motorcycle</span>
                <span>Car & Automotive</span>
                <span>Inverter & Solar</span>
                <span>E-Rickshaw</span>
            </div> */}

            <div className="tabs">

                <span
                    className={activeTab === "ALL" ? "active-tab" : ""}
                    onClick={() => { setActiveTab("ALL"); fetchProducts(currentPage, search); }}
                >
                    All Batteries
                </span>

                {vehicleTypes.map((vt) => (
                    <span
                        key={vt.id}
                        className={activeTab === vt.id ? "active-tab" : ""}
                        // onClick={() => setActiveTab(vt.id)}
                        onClick={() => fetchProductsByVehicleType(vt.id)}
                    >
                        {vt.name}
                    </span>
                ))}
            </div>

            {/* Product Cards */}
            <div className="product-grid">
                {inventory.length === 0 ? (
                    <div className="no-data">
                        <h3>No Inventory Found</h3>
                    </div>
                ) : (
                    inventory.map((item, index) => (
                        <div
                            key={index}
                            className={`inventory-card ${item.status === "critical" ? "critical-border" : ""
                                }`}
                            // onClick={() => navigate(`/product/${item.serialNo}`)}
                        onClick={() => navigate(`/admin/product-details/${item.serialNo}`)}
                        >
                            <div className="product-left">
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="product-image"
                                />
                            </div>

                            <div className="product-right">

                                <div className="product-top">
                                    <h3>{item.name}</h3>

                                    <div className="card-actions">
                                        {/* <span
                                        className={`inventory-badge ${item.status === "critical" ? "badge-red" : "badge-green"
                                            }`}
                                    >
                                        {item.status === "critical"
                                            ? "CRITICALLY LOW"
                                            : "IN STOCK"}
                                    </span> */}

                                        <span
                                            className={`inventory-badge ${item.stock <= 10
                                                ? "badge-red"
                                                : item.stock <= 30
                                                    ? "badge-orange"
                                                    : "badge-green"
                                                }`}
                                        >
                                            {item.stock <= 10
                                                ? "CRITICALLY LOW"
                                                : item.stock <= 30                   /* 5 and 20 */
                                                    ? "LOW STOCK"
                                                    : "IN STOCK"}
                                        </span>

                                        <div className="menu-container">
                                            <button
                                                className="dots-btn"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    // const menu = e.currentTarget.nextSibling;
                                                    // menu.classList.toggle("show-menu");
                                                    setOpenMenu(openMenu === item.serialNo ? null : item.serialNo);
                                                }}
                                            >
                                                ⋮
                                            </button>

                                            <div className={`dropdown-menu ${openMenu === item.serialNo ? "show-menu" : ""}`}>
                                                <button className="edit-btn" onClick={(e) => { e.stopPropagation(); navigate(`/admin/edit-product/${item.serialNo}`); }}>Edit</button>
                                                <button className="delete-btn" disabled={deletingSerial === item.serialNo} onClick={(e) => { e.stopPropagation(); handleDelete(item.serialNo); }}>{deletingSerial === item.serialNo ? "Deleting..." : "Delete"}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* <p className="sku">SKU: {item.sku}</p> */}
                                <p className="sku">Serial No: {item.serialNo}</p>

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
                                            // width: `${item.capacity}%`,
                                            // width: `${stockPercentage}%`,
                                            width: item.stock > 50 ? "100%" : `${item.stock * 2}%`,
                                            backgroundColor:
                                                // item.capacity < 20
                                                item.stock < 10
                                                    ? "#ef4444"     // 🔴 Red (critical)
                                                    : item.stock < 30
                                                        ? "#f59e0b"     // 🟠 Orange (medium)
                                                        : "#22c55e",    // 🟢 Green (good)
                                        }}
                                    ></div>
                                </div>
                                {/* <small>Warehouse Capacity {item.capacity}%</small> */}
                                <div className="capacity-text">
                                    {/* <span className="capacity-label">WAREHOUSE CAPACITY</span> */}
                                    <span className="capacity-label">STOCK AVAILABLE</span>
                                    <span className="capacity-value" style={{
                                        color:
                                            // item.capacity < 20
                                            item.stock < 10
                                                ? "red"
                                                : item.stock < 30
                                                    ? "orange"
                                                    : "green",
                                        // }}>{item.capacity}%</span>
                                        // }}>{stockPercentage.toFixed(0)}%</span>
                                    }}>{Math.min((item.stock / 50) * 100, 100).toFixed(0)}%</span>
                                </div>

                            </div>
                        </div>
                    ))
                )}

                <div className="add-sku-card" onClick={() => navigate("/admin/create-product")}>
                    <span>＋</span>
                    <p>Add New SKU</p>
                </div>
            </div>

            {/* Pagination */}
            <div className="pagination">

                <button
                    className="nav-btn"
                    disabled={currentPage === 0}
                    onClick={goPrev}
                >
                    Prev
                </button>

                {getPageNumbers().map((page) => (
                    <button
                        key={page}
                        className={`page-btn ${currentPage === page - 1 ? "active" : ""}`}
                        onClick={() => setCurrentPage(page - 1)}
                    >
                        {page}
                    </button>
                ))}

                <button
                    className="nav-btn"
                    disabled={currentPage === totalPages - 1}
                    onClick={goNext}
                >
                    Next
                </button>

            </div>
        </div>
    );
};

export default Inventory;
