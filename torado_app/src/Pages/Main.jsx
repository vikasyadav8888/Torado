import React, { useState } from "react";
import AdminHeader from "../Components/AdminHeader";
import AdminSidebar from "../Components/AdminSidebar";

import Dashbord from "./Dashbord";
import Users from "./Users";
import Faqadmin from "./Faqadmin";
import StoreData from "./StoreData";
import OurTeamb from "./OurTeamb";
import ProductReview from "./ProductReview";
import ProductDetails from "./ProductDetails";
import ProductCatagory from "./ProductCatagory";

const Main = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashbord />;

      case "users":
        return <Users />;

      /* 🔥 PRODUCTS DROPDOWN CONTENT */
      // case "products":
      //   return <Product />; // optional (overview page)

      case "product-review":
        return <ProductReview/>;

      case "product-category":
        return <ProductCatagory/>;

      case "product-details":
        return <ProductDetails/>;

      case "faq":
        return <Faqadmin />;

      case "store-location":
        return <StoreData />;

      case "our-team":
        return <OurTeamb />;

      default:
        return <Dashbord />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="admin-main">
        <AdminHeader />
        <div className="admin-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Main;
