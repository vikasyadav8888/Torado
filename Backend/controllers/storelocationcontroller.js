import storeLocationModel from "../models/storelocationmodel.js";

const storeLocationController = {
  async create(req, res) {
    try {
      await storeLocationModel.create(req.body);

      res.status(201).json({
        success: true,
        message: "Store location created successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Failed to create store location",
      });
    }
  },
  async getAll(req, res) {
    try {
      const data = await storeLocationModel.getAll();

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch store locations",
      });
    }
  },

  async getById(req, res) {
    try {
      const data = await storeLocationModel.getById(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Store location not found",
        });
      }

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch store location",
      });
    }
  },

  async update(req, res) {
    try {
      await storeLocationModel.update(req.params.id, req.body);

      res.status(200).json({
        success: true,
        message: "Store location updated successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to update store location",
      });
    }
  },
  async hardDelete(req, res) {
    try {
      await storeLocationModel.hardDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Store location deleted permanently",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete store location",
      });
    }
  },
};

export default storeLocationController;