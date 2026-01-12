import React from "react";
import Blogwithgride from "../Components/Blogwithgride";
import PopularBlogs from "../Components/PopularBlogs";

const BlogRightSidebar = () => {
  return (
    <>
      <section className="section-main2">
        <div className="row">
          <div className="col-8">
            <Blogwithgride />
          </div>
          <div className="col-4">
            <PopularBlogs />
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogRightSidebar;
