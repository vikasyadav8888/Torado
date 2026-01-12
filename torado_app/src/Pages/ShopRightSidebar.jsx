import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import FilterShop from "../Components/FilterShop";
import LeftGrid from "../Components/LeftGrid";

function ShopRightSidebar() {
  const [products, setProducts] = useState([]);

  const [price, setPrice] = useState(1000);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);

  // Fetch products from API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/product/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Price filter
      const priceMatch = Number(item.price) <= price;

      // Color filter (case-insensitive)
      const colorMatch =
        colors.length === 0 ||
        colors.map((c) => c.toLowerCase()).includes(item.color.toLowerCase());

      // Category filter
      const categoryMatch =
        categories.length === 0 || categories.includes(item.category_name);

      // Condition filter using tag_type
      const conditionMatch =
        conditions.length === 0 ||
        (conditions.includes("New") && item.tag_type === "new") ||
        (conditions.includes("Sale") && item.tag_type === "hot") ||
        (conditions.includes("Offer") && item.tag_type === "offer");

      return priceMatch && colorMatch && categoryMatch && conditionMatch;
    });
  }, [products, price, colors, categories, conditions]);

  return (
    <>
      <section className="about-hero">
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <h1>Shop List</h1>
          <p>
            Home <span>/</span> <span className="active">Shop List</span>
          </p>
        </div>
      </section>
      <section className="section-main2">
        <div className="row">
          <div className="col-8">
            <section className="gridnum">
              <LeftGrid products={filteredProducts} />
            </section>
          </div>
          <div className="col-4">
            <FilterShop
              price={price}
              setPrice={setPrice}
              colors={colors}
              setColors={setColors}
              categories={categories}
              setCategories={setCategories}
              conditions={conditions}
              setConditions={setConditions}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ShopRightSidebar;
