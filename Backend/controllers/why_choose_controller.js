import whychooseUsModel from "../models/why_choose_model.js";


const whyChooseUsController = {
  // CREATE
  async create(req, res) {
    try {
      const { title, subtitle, icon } = req.body;

      if (!title || !subtitle) {
        return res.status(400).json({
          message: "Title and subtitle are required",
        });
      }

      await whychooseUsModel.create({
        title,
        subtitle,
        icon,
        created_by: 1, 
      });

      res.status(201).json({
        message: "Why Choose Us card created successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await whychooseUsModel.getAll();

      res.status(200).json({
        message: "Why Choose Us cards fetched successfully",
        data,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;

      await whychooseUsModel.update(id, {
        ...req.body,
        updated_by: 1,
      });

      res.status(200).json({
        message: "Why Choose Us card updated successfully",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;

      await whychooseUsModel.hardDelete(id);

      res.status(200).json({
        message: "Why Choose Us card deleted permanently",
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default whyChooseUsController;
