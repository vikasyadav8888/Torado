import React, { useState } from "react";
import PopularBlogs from "../Components/PopularBlogs";
import Blogwithgride from "../Components/Blogwithgride";

const BlogLeftSidebar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="section-main2">
      <div className="row">
        <div className="col-4">
          <PopularBlogs
            onCategorySelect={(catId) => setSelectedCategory(catId)}
          />
        </div>

        <div className="col-8">
          <Blogwithgride selectedCategory={selectedCategory} />
        </div>
      </div>
    </section>
  );
};

export default BlogLeftSidebar;
