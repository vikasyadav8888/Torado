import blogTagModel from "../models/blogtagmodel.js";


const blogTagController = {
  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: "Tag name is required" });
      await blogTagModel.create(req.body);
      res.status(201).json({ message: "Tag created successfully" });
    } catch (error) {
      console.error("Create Tag Error:", error);
      res.status(500).json({ message: "Failed to create tag", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogTagModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Get All Tags Error:", error);
      res.status(500).json({ message: "Failed to fetch tags", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await blogTagModel.getById(id);
      if (!data) return res.status(404).json({ message: "Tag not found" });
      res.status(200).json(data);
    } catch (error) {
      console.error("Get Tag By ID Error:", error);
      res.status(500).json({ message: "Failed to fetch tag", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await blogTagModel.update(id, req.body);
      res.status(200).json({ message: "Tag updated successfully" });
    } catch (error) {
      console.error("Update Tag Error:", error);
      res.status(500).json({ message: "Failed to update tag", error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;
      await blogTagModel.hardDelete(id);
      res.status(200).json({ message: "Tag deleted permanently" });
    } catch (error) {
      console.error("Hard Delete Tag Error:", error);
      res.status(500).json({ message: "Failed to delete tag", error: error.message });
    }
  },
};

export default blogTagController;
