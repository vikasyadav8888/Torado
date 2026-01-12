import blogTagMapModel from "../models/blogtagmap.js";


const blogTagMapController = {
  async create(req, res) {
    try {
      const { blog_id, tag_id } = req.body;
      if (!blog_id || !tag_id) return res.status(400).json({ message: "Required fields missing" });
      await blogTagMapModel.create(req.body);
      res.status(201).json({ message: "Blog-tag mapping created successfully" });
    } catch (error) {
      console.error("Create Blog-Tag Map Error:", error);
      res.status(500).json({ message: "Failed to create mapping", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogTagMapModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Get All Blog-Tag Map Error:", error);
      res.status(500).json({ message: "Failed to fetch mapping", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await blogTagMapModel.getById(id);
      if (!data) return res.status(404).json({ message: "Mapping not found" });
      res.status(200).json(data);
    } catch (error) {
      console.error("Get Blog-Tag Map By ID Error:", error);
      res.status(500).json({ message: "Failed to fetch mapping", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await blogTagMapModel.update(id, req.body);
      res.status(200).json({ message: "Mapping updated successfully" });
    } catch (error) {
      console.error("Update Blog-Tag Map Error:", error);
      res.status(500).json({ message: "Failed to update mapping", error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;
      await blogTagMapModel.hardDelete(id);
      res.status(200).json({ message: "Mapping deleted permanently" });
    } catch (error) {
      console.error("Hard Delete Blog-Tag Map Error:", error);
      res.status(500).json({ message: "Failed to delete mapping", error: error.message });
    }
  },
};

export default blogTagMapController;
