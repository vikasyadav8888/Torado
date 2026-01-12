import blogCategoryMapModel from "../models/blogcatagorymap.js";


const blogCategoryMapController = {
  async create(req, res) {
    try {
      const { blog_id, category_id } = req.body;
      if (!blog_id || !category_id) return res.status(400).json({ message: "Required fields missing" });
      await blogCategoryMapModel.create(req.body);
      res.status(201).json({ message: "Blog-category mapping created successfully" });
    } catch (error) {
      console.error("Create Blog-Category Map Error:", error);
      res.status(500).json({ message: "Failed to create mapping", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogCategoryMapModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Get All Blog-Category Map Error:", error);
      res.status(500).json({ message: "Failed to fetch mapping", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await blogCategoryMapModel.getById(id);
      if (!data) return res.status(404).json({ message: "Mapping not found" });
      res.status(200).json(data);
    } catch (error) {
      console.error("Get Blog-Category Map By ID Error:", error);
      res.status(500).json({ message: "Failed to fetch mapping", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await blogCategoryMapModel.update(id, req.body);
      res.status(200).json({ message: "Mapping updated successfully" });
    } catch (error) {
      console.error("Update Blog-Category Map Error:", error);
      res.status(500).json({ message: "Failed to update mapping", error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;
      await blogCategoryMapModel.hardDelete(id);
      res.status(200).json({ message: "Mapping deleted permanently" });
    } catch (error) {
      console.error("Hard Delete Blog-Category Map Error:", error);
      res.status(500).json({ message: "Failed to delete mapping", error: error.message });
    }
  },
};

export default blogCategoryMapController;
