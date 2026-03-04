// import products from "../data/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductCatalog = () => {

  const [filters, setFilters] = useState({
    vehicleTypes: [], minCapacity: null, maxCapacity: null
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);

  const [showFilter, setShowFilter] = useState(false);
  const [vehicleTypes, setVehicleTypes] = useState([]);

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

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

  // 🔥 Fetch Vehicle Types Function
  const fetchVehicleTypes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/api/specifications/vehicle-types"
      );
      setVehicleTypes(response.data);
    } catch (error) {
      console.error("Error fetching vehicle types:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();

      appliedFilters.vehicleTypes.forEach(id =>
        params.append("vehicleTypes", id)
      );

      if (appliedFilters.minCapacity !== null)
        params.append("minCapacity", appliedFilters.minCapacity);

      if (appliedFilters.maxCapacity !== null)
        params.append("maxCapacity", appliedFilters.maxCapacity);

      params.append("page", currentPage - 1); // Spring starts from 0
      params.append("size", productsPerPage);

      const response = await axios.get(
        `http://localhost:8090/api/products/filter-products?${params.toString()}`
      );

      setProducts(response.data.content);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Call on page load
  useEffect(() => {
    fetchVehicleTypes();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [appliedFilters, currentPage]);

  return (
    <>
      <div className="catalog container">
        {/* <FilterSidebar /> */}

        {/* Mobile Filter Button */}
        <button className="mobile-filter-btn" onClick={() => setShowFilter(true)}>
          <i className="fa-solid fa-filter"></i> Filter
        </button>

        {/* Overlay */}
        {showFilter && <div className="overlay" onClick={() => setShowFilter(false)}></div>}

        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          appliedFilters={appliedFilters}
          setAppliedFilters={setAppliedFilters}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          vehicleTypes={vehicleTypes}
          setCurrentPage={setCurrentPage}
        />

        <div className="products">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

      </div >

      {/* Pagination */}
      <div className="pagination">

        <button
          className="nav-btn"
          disabled={currentPage === 1}
          onClick={goPrev}
        >
          Prev
        </button>

        {getPageNumbers().map((page) => (
          <button
            key={page}
            className={`page-btn ${currentPage === page ? "active" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        <button
          className="nav-btn"
          disabled={currentPage === totalPages}
          onClick={goNext}
        >
          Next
        </button>

      </div>
    </>
  );
};

export default ProductCatalog;
