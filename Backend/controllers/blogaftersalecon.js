import blogAfterSaleModel from "../models/blogaftersale.js"

const blogAfterSaleController = {
  async create(req, res) {
    try {
      const { blog_id, title, checked_list } = req.body;

      if (!blog_id || !title || !Array.isArray(checked_list)) {
        return res.status(400).json({
          message: "blog_id, title and checked_list array are required"
        });
      }

      await blogAfterSaleModel.create(req.body);

      res.status(201).json({
        message: "After-sale section created successfully"
      });
    } catch (error) {
      console.error("Create After Sale Error:", error);
      res.status(500).json({ message: "Create failed" });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogAfterSaleModel.getAll();
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "Fetch failed" });
    }
  },

  async getById(req, res) {
    try {
      const data = await blogAfterSaleModel.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Not found" });
      res.status(200).json(data);
    } catch {
      res.status(500).json({ message: "Fetch failed" });
    }
  },

  async update(req, res) {
    try {
      await blogAfterSaleModel.update(req.params.id, req.body);
      res.status(200).json({ message: "Updated successfully" });
    } catch {
      res.status(500).json({ message: "Update failed" });
    }
  },

  async hardDelete(req, res) {
    try {
      await blogAfterSaleModel.hardDelete(req.params.id);
      res.status(200).json({ message: "Deleted permanently" });
    } catch {
      res.status(500).json({ message: "Delete failed" });
    }
  }
};

export default blogAfterSaleController;
