import React, { useEffect, useState } from "react";
import axios from "axios";

const StoreLocations = () => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/store_location/"
        );
        setStores(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch store locations", error);
      }
    };

    fetchStores();
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-overlay"></div>

        <div className="about-hero-content">
          <h1>Store Locations</h1>
          <p>
            Home <span>/</span>{" "}
            <span className="active">Store Locations</span>
          </p>
        </div>
      </section>

      
      <section className="section-main2">
      <section className="store-wrapper">
        <div className="store-grid">
          {stores.length === 0 ? (
            <p>No store locations found</p>
          ) : (
            stores.map((item) => (
              <div className="store-card" key={item.id}>
                <h3>{item.store_name}</h3>

                <p>
                  <strong>Address:</strong>
                 <span className="information">{item.address}</span>
                  
                </p>

                <p>
                  <strong>Hours:</strong>
                 <span className="information">{item.hours}</span>
                  
                </p>

                <p>
                  <strong>Mobile:</strong>
                 <span className="information">{item.mobile}</span>
                </p>
              </div>
            ))
          )}
        </div>
      </section>
      </section>
    </>
  );
};

export default StoreLocations;
