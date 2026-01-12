import faqModel from "../models/faqmodel.js";

const faqController = {

  async create(req, res) {
    try {
      await faqModel.create(req.body);
      res.status(201).json({
        message: "FAQ created successfully"
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await faqModel.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await faqModel.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      await faqModel.update(req.params.id, req.body);
      res.json({
        message: "FAQ updated successfully"
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      await faqModel.hardDelete(req.params.id);
      res.json({
        message: "FAQ deleted successfully"
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

export default faqController;
