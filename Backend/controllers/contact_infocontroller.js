import contactInfoModel from "../models/contact_infomodel.js";


const contactInfoController = {
  async create(req, res) {
    try {
      await contactInfoModel.create(req.body);
      res.json({ success: true, message: "Contact info added" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await contactInfoModel.getAll();
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async getByType(req, res) {
    try {
      const data = await contactInfoModel.getByType(req.params.type);
      res.json({ success: true, data });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async update(req, res) {
    try {
      await contactInfoModel.update(req.params.id, req.body);
      res.json({ success: true, message: "Contact info updated" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },

  async hardDelete(req, res) {
    try {
      await contactInfoModel.hardDelete(req.params.id);
      res.json({ success: true, message: "Contact info deleted permanently" });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  },
};

export default contactInfoController;
