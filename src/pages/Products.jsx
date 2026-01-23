import React from 'react'
import { useState } from 'react';
import ProductCatalog from "../components/ProductCatalog";
import '../pages/Products.css';
import ProductDetailHero from '../components/ProductDetailHero';
import Contact from '../components/Contact';

const Products = () => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <>
      <ProductCatalog showFilter={showFilter} />
      <ProductDetailHero />
      <Contact />
    </>

  );
};

export default Products;