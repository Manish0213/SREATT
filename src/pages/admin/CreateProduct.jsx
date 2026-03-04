import React from "react";
import "./CreateProduct.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Alert from "./components/Alert";
import Loading from "./components/Loading";

const CreateProduct = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const [images, setImages] = useState([]);
    const [brands, setBrands] = useState([]);
    const [vehicleTypes, setVehicleTypes] = useState([]);
    const [batteryChemistries, setBatteryChemistries] = useState([]);
    const [selectedVehicleId, setSelectedVehicleId] = useState("");
    const [selectedVehicles, setSelectedVehicles] = useState([]);
    const [selectedBrandId, setSelectedBrandId] = useState("");
    const [selectedChemistryId, setSelectedChemistryId] = useState("");
    const [quantity, setQuantity] = useState(48);
    const [loading, setLoading] = useState(false);
    const [alertData, setAlertData] = useState(null);

    const initialFormState = {
        name: "",
        description: "",
        serialNo: "",
        price: "",
        voltage: "",
        cca: "",
        ampHours: "",
        reserveCapacity: "",
        warrantyMonths: "",
    };


    // const [formData, setFormData] = useState({
    //     name: "",
    //     description: "",
    //     price: "",
    //     serialNo: "",
    //     voltage: "",
    //     cca: "",
    //     ampHours: "",
    //     reserveCapacity: "",
    //     brandId: "",
    //     chemistryId: "",
    //     vehicleTypeIds: []
    // });

    // const [formData, setFormData] = useState({
    //     name: "",
    //     description: "",
    //     serialNo: "",
    //     price: "",
    //     voltage: "",
    //     cca: "",
    //     ampHours: "",
    //     reserveCapacity: "",
    //     warrantyMonths: "",
    // });

    const [formData, setFormData] = useState(initialFormState);

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

    const handleAddVehicle = () => {
        if (!selectedVehicleId) return;

        const vehicleObj = vehicleTypes.find(
            (v) => v.id.toString() === selectedVehicleId
        );

        // Duplicate prevent
        if (selectedVehicles.some(v => v.id === vehicleObj.id)) return;

        setSelectedVehicles(prev => [...prev, vehicleObj]);
        setSelectedVehicleId(""); // reset dropdown
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlertData(null); // purana alert clear

        try {
            const token = localStorage.getItem("token");

            const form = new FormData();

            form.append("name", formData.name);
            form.append("description", formData.description);
            form.append("serialNo", formData.serialNo);
            form.append("price", Number(formData.price));
            form.append("stock", quantity);

            form.append("voltage", Number(formData.voltage));
            form.append("cca", Number(formData.cca));
            form.append("ampHours", Number(formData.ampHours));
            form.append("reserveCapacity", Number(formData.reserveCapacity));
            form.append("warrantyMonths", Number(formData.warrantyMonths));

            form.append("brandId", Number(selectedBrandId));
            form.append("batteryChemistryId", Number(selectedChemistryId));

            selectedVehicles.forEach(v => {
                form.append("vehicleTypeIds", v.id);
            });

            images.forEach(img => {
                form.append("images", img);
            });

            await axios.post(`${apiUrl}/api/products`, form, {
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`, }
            });

            // ✅ Success alert
            setAlertData({
                type: "success",
                message: "Product created successfully ✅"
            });

            // 🔥 FORM RESET YAHAN HOGA
            setFormData(initialFormState);
            setSelectedBrandId("");
            setSelectedChemistryId("");
            setSelectedVehicleId("");
            setSelectedVehicles([]);
            setImages([]);
            setQuantity(48);   // default stock

        } catch (error) {

            const backendMessage =
                error.response?.data?.errorMessage ||
                "Something went wrong ❌";

            setAlertData({
                type: "error",
                message: backendMessage
            });

        } finally {
            setLoading(false); // 👈 HAMESHA chalega
        }
    };

    useEffect(() => {
        axios.get(`${apiUrl}/api/specifications/vehicle-types`)
            .then((res) => {
                setVehicleTypes(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/specifications/brands`)
            .then((res) => {
                setBrands(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        axios.get(`${apiUrl}/api/specifications/battery-chemistries`)
            .then((res) => {
                setBatteryChemistries(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="create-product">
            {loading && (
                // <div className="loading-overlay">
                //     <div className="loading-spinner"></div>
                //     <p>Creating Product...</p>
                // </div>
                <Loading message="Creating Product..." />
            )}
            {alertData && (
                <Alert type={alertData.type} message={alertData.message} onClose={() => setAlertData(null)} />
            )}
            {/* <Alert /> */}
            {/* Header */}
            <div className="cp-header">
                <div>
                    <h1>Upload New Battery Product</h1>
                    <p>Add technical specifications and pricing for a new vehicle battery unit.</p>
                </div>

                {/* <div className="cp-actions">
                    <button className="btn-outline">Save Draft</button>
                    <button className="btn-primary">Publish Product</button>
                </div> */}

                <form onSubmit={handleSubmit} className="cp-actions">
                    {/* saare inputs */}

                    {/* <div className="cp-actions"> */}
                    {/* <button
                            type="button"
                            className="btn-outline"
                            // onClick={() => handleSubmit("DRAFT")}
                        >
                            Save Draft
                        </button> */}

                    <button
                        type="submit"
                        className="btn-primary"
                    // onClick={() => setStatus("PUBLISHED")}
                    >
                        Publish Product
                    </button>
                    {/* </div> */}
                </form>
            </div>

            {/* Top Sections */}
            <div className="cp-grid">
                {/* Basic Info */}
                <div className="cp-card">
                    <h3><i className="fa-solid fa-circle-info"></i> Basic Information</h3>

                    <label>Product Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. DieHard Platinum AGM Group 35" />

                    <label>Product Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="e.g. DieHard Platinum AGM Group 35"
                        rows="4"
                    ></textarea>

                    {/* <label>SKU Number</label>
                    <div className="sku-row">
                        <input placeholder="BT-9902-X1" />
                        <span className="auto-gen">AUTO-GEN</span>
                    </div> */}

                    <label>Serial Number</label>
                    <div className="sku-row">
                        <input name="serialNo" value={formData.serialNo} onChange={handleChange} placeholder="BT-9902-X1" />
                        <span className="auto-gen">AUTO-GEN</span>
                    </div>

                    <label>Brand</label>
                    {/* <select>
                        <option>Select Brand</option>
                        <option>Exide</option>
                        <option>Amaron</option>
                    </select> */}
                    <select
                        value={selectedBrandId}
                        onChange={(e) => setSelectedBrandId(e.target.value)}
                    >
                        <option value="">Select Brand</option>
                        {brands.map((brand) => (
                            <option key={brand.id} value={brand.id}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Specifications */}
                <div className="cp-card">
                    <h3><i className="fa-solid fa-sliders"></i> Specifications</h3>

                    <div className="two-col">
                        <div className="specification-form-group">
                            <label>Voltage (V)</label>
                            <input name="voltage" type="number" value={formData.voltage} onChange={handleChange} placeholder="12" />
                        </div>

                        <div className="specification-form-group">
                            <label>CCA (@ 0°F)</label>
                            <input name="cca" type="number" value={formData.cca} onChange={handleChange} placeholder="850" />
                        </div>

                        <div className="specification-form-group">
                            <label>Amp Hours (AH)</label>
                            <input name="ampHours" type="number" value={formData.ampHours} onChange={handleChange} placeholder="70" />
                        </div>

                        {/* <div className="specification-form-group">
                            <label>Reserve Cap (Min)</label>
                            <input name="reserveCapacity" type="number" value={formData.reserveCap} onChange={handleChange} placeholder="120" />
                        </div> */}

                        <div className="specification-form-group">
                            <label>Warranty (Months)</label>
                            <input name="warrantyMonths" type="number" value={formData.warrantyMonths} onChange={handleChange} placeholder="12 months" />
                        </div>
                    </div>

                    {/* <label>Dimensions (L x W x H)</label>
                    <div className="three-col">
                        <input placeholder="9.1" />
                        <input placeholder="6.8" />
                        <input placeholder="8.9" />
                    </div> */}

                    {/* <label>Terminal Position</label>
                    <div className="terminal-grid">
                        <button>LHP</button>
                        <button className="active">RHP</button>
                        <button>Top Post</button>
                    </div> */}

                    <label>Vehicle Type</label>
                    <div className="vehicle-type-row">
                        <select value={selectedVehicleId} onChange={(e) => setSelectedVehicleId(e.target.value)}>
                            <option value="">Select Vehicle Type</option>
                            {vehicleTypes.map((vt) => (
                                <option key={vt.id} value={vt.id}>
                                    {vt.name}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={handleAddVehicle}>add</button>
                    </div>

                    {selectedVehicles.length > 0 && (
                        <div className="vehicle-list">
                            {selectedVehicles.map((vehicle) => (
                                <div key={vehicle.id} className="vehicle-tag">
                                    {vehicle.name}
                                    <span
                                        onClick={() =>
                                            setSelectedVehicles(prev =>
                                                prev.filter(v => v.id !== vehicle.id)
                                            )
                                        }
                                    >
                                        ✕
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    <label>Battery Chemistry</label>
                    {/* <div className="radio-grid">
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
                    </div> */}

                    <div className="radio-grid">
                        {batteryChemistries.map((chem) => (
                            <label key={chem.id} className="radio-card">
                                <input
                                    type="radio"
                                    name="chemistry"
                                    value={chem.id}
                                    checked={selectedChemistryId === chem.id.toString()}
                                    onChange={(e) => setSelectedChemistryId(e.target.value)}
                                />
                                <span>{chem.name}</span>
                            </label>
                        ))}
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
                                    {/* <span className="image-name">{file.name}</span> */}

                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="preview"
                                        className="image-thumb"
                                    />

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
                        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="MSRP ($)" />
                        <input placeholder="Sale Price ($)" />
                    </div>

                    <label>Stock Quantity</label>
                    <div className="qty-row">
                        {/* <button>-</button> */}
                        <button
                            type="button"
                            onClick={() =>
                                setQuantity((prev) => (prev > 0 ? prev - 1 : 0))
                            }
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        {/* <button>+</button> */}
                        <button
                            type="button"
                            onClick={() => setQuantity((prev) => prev + 1)}
                        >
                            +
                        </button>
                    </div>

                    <label className="checkbox">
                        <input type="checkbox" /> Auto-replenish stock when low
                    </label>
                </div>
            </div>

            {/* Vehicle Compatibility */}
            {/* <div className="cp-card full-card">
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
            </div> */}
        </div>
    );
};

export default CreateProduct;