import products from "../data/products";
import ProductCard from "./ProductCard";
import FilterSidebar from "./FilterSidebar";
import { useState } from "react";

const ProductCatalog = () => {
  const [filters, setFilters] = useState({});
  const [showFilter, setShowFilter] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / productsPerPage);

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
          showFilter={showFilter}
          setShowFilter={setShowFilter}
        />

        <div className="products">
          {currentProducts.map((item) => (
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
