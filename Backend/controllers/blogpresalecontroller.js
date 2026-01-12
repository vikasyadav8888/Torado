import blogPreSaleModel from "../models/blogpresale.js"

const blogPreSaleController = {
  async create(req, res) {
    try {
      const { blog_id, title, requirement } = req.body;

      if (!blog_id || !title || !Array.isArray(requirement)) {
        return res.status(400).json({
          message: "blog_id, title and requirement array are required"
        });
      }

      await blogPreSaleModel.create(req.body);

      res.status(201).json({
        message: "Pre-sale created successfully"
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Create failed" });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogPreSaleModel.getAll();
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "Fetch failed" });
    }
  },

  async getById(req, res) {
    try {
      const data = await blogPreSaleModel.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Not found" });
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "Fetch failed" });
    }
  },

  async update(req, res) {
    try {
      await blogPreSaleModel.update(req.params.id, req.body);
      res.status(200).json({ message: "Updated successfully" });
    } catch {
      res.status(500).json({ message: "Update failed" });
    }
  },

  async hardDelete(req, res) {
    try {
      await blogPreSaleModel.hardDelete(req.params.id);
      res.status(200).json({ message: "Deleted permanently" });
    } catch {
      res.status(500).json({ message: "Delete failed" });
    }
  }
};

export default blogPreSaleController;
