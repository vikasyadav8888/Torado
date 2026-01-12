import React from "react";
import ProductCard from "./ProductCard";


const ProductColumn = ({ title, data }) => {
  return (
    <div>
      <h3 className="sp-heading">{title}</h3>
      {data.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};

export default ProductColumn;
