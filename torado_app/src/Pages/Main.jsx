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
import Main_blog from "../Components/Main_blog";
import BlogCategory from "../Components/BlogCategory";
import CategoryMap from "../Components/CategoryMap";
import BlogTags from "../Components/BlogTags";
import TagsMap from "../Components/TagsMap";
import BlogParagraph from "../Components/BlogParagraph";
import BlogPresale from "../Components/BlogPresale";
import AfterBlogSale from "../Components/AfterBlogSale";
import BlogComments from "../Components/BlogComments";
import OdersAdmin from "../Components/OdersAdmin";

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

      case "main-blogs":
        return <Main_blog/>;

      case "blog-category":
        return <BlogCategory/>;
        
      case "category-map":
        return <CategoryMap/>;
        
      case "blog-tags":
        return <BlogTags/>;

      case "tag-map":
        return <TagsMap/>;

      case "blog-paragraph":
        return <BlogParagraph/>;

      case "pre-sale-blogs":
        return <BlogPresale/>;

      case "after-sale-blogs":
        return <AfterBlogSale/>;

      case "blog-comments":
        return <BlogComments/>;

      case "faq":
        return <Faqadmin />;

      case "store-location":
        return <StoreData />;

      case "our-team":
        return <OurTeamb />;
        case "orders":
          return <OdersAdmin/>;

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
