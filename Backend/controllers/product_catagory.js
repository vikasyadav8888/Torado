import categoryModel from "../models/product_catagory.js";


const categoryController = {
  async create(req, res) {
    try {
      await categoryModel.create(req.body);
      res.status(201).json({ message: "Category created successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await categoryModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async hardDelete(req, res) {
    try {
      await categoryModel.hardDelete(req.params.id);
      res.json({ message: "Category hard deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default categoryController;
