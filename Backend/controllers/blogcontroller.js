import blogModel from "../models/blogmodel.js";

const blogController = {
  async create(req, res) {
    try {
      const { title, blog_date, heading } = req.body;
      if (!title || !blog_date || !heading) {
        return res.status(400).json({ message: "Required fields missing" });
      }
      await blogModel.create(req.body);
      res.status(201).json({ message: "Blog created successfully" });
    } catch (error) {
      console.error("Create Blog Error:", error);
      res
        .status(500)
        .json({ message: "Failed to create blog", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Get All Blogs Error:", error);
      res
        .status(500)
        .json({ message: "Failed to fetch blogs", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await blogModel.getById(id);

      if (!data.blog) {
        return res.status(404).json({ message: "Blog not found" });
      }

      res.status(200).json(data);
    } catch (error) {
      console.error("Get Blog Detail Error:", error);
      res.status(500).json({
        message: "Failed to fetch blog details",
        error: error.message,
      });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await blogModel.update(id, req.body);
      res.status(200).json({ message: "Blog updated successfully" });
    } catch (error) {
      console.error("Update Blog Error:", error);
      res
        .status(500)
        .json({ message: "Failed to update blog", error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;
      await blogModel.hardDelete(id);
      res.status(200).json({ message: "Blog deleted permanently" });
    } catch (error) {
      console.error("Hard Delete Blog Error:", error);
      res
        .status(500)
        .json({ message: "Failed to delete blog", error: error.message });
    }
  },
};

export default blogController;
