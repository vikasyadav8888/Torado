import productModel from "../models/productmodel.js";

const productController = {
  async create(req, res) {
    try {
      await productModel.create(req.body);
      res.status(201).json({
        message: "Product created successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },

  async getAll(req, res) {
    try {
      const data = await productModel.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },

  async getById(req, res) {
    try {
      const data = await productModel.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      await productModel.update(req.body);
      res.json({
        message: "Product updated successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },

  async hardDelete(req, res) {
    try {
      await productModel.hardDelete(req.params.id);
      res.json({
        message: "Product hard deleted successfully",
      });
    } catch (err) {
      res.status(500).json({
        error: err.message,
      });
    }
  },
};

export default productController;
