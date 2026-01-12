import teamModel from "../models/teammodel.js";


const teamController = {
  async create(req, res) {
    try {
      await teamModel.create(req.body);
      res.status(201).json({ message: "Team member created successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await teamModel.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await teamModel.getById(req.params.id);
      if (!data) {
        return res.status(404).json({ message: "Team member not found" });
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async update(req, res) {
    try {
      await teamModel.update(req.params.id, req.body);
      res.json({ message: "Team member updated successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      await teamModel.hardDelete(req.params.id);
      res.json({ message: "Team member deleted permanently" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

export default teamController;
