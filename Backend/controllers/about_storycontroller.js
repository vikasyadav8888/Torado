import aboutStoryModel from "../models/aboutstorymodel.js";
const aboutStoryController = {

  async create(req, res) {
    try {
      const {
        title,
        description1,
        description2,
        quote,
        founder_name,
        founder_role,
        image,
      } = req.body;

      if (!title || !description1 || !quote || !founder_name) {
        return res.status(400).json({
          message: "Required fields are missing",
        });
      }

      await aboutStoryModel.create(req.body);

      res.status(201).json({
        message: "About story created successfully",
      });

    } catch (error) {
      console.error("Create About Story Error:", error);

      res.status(500).json({
        message: "Failed to create about story",
        error: error.message,
      });
    }
  },

  // GET ALL
  async getAll(req, res) {
    try {
      const data = await aboutStoryModel.getAll();

      res.status(200).json(data);

    } catch (error) {
      console.error("Get All About Stories Error:", error);

      res.status(500).json({
        message: "Failed to fetch about stories",
        error: error.message,
      });
    }
  },

  // GET BY ID
  async getById(req, res) {
    try {
      const { id } = req.params;

      const data = await aboutStoryModel.getById(id);

      if (!data) {
        return res.status(404).json({
          message: "About story not found",
        });
      }

      res.status(200).json(data);

    } catch (error) {
      console.error("Get About Story By ID Error:", error);

      res.status(500).json({
        message: "Failed to fetch about story",
        error: error.message,
      });
    }
  },

  // UPDATE
  async update(req, res) {
    try {
      const { id } = req.params;

      await aboutStoryModel.update(id, req.body);

      res.status(200).json({
        message: "About story updated successfully",
      });

    } catch (error) {
      console.error("Update About Story Error:", error);

      res.status(500).json({
        message: "Failed to update about story",
        error: error.message,
      });
    }
  },

  // HARD DELETE
  async hardDelete(req, res) {
    try {
      const { id } = req.params;

      await aboutStoryModel.hardDelete(id);

      res.status(200).json({
        message: "About story deleted permanently",
      });

    } catch (error) {
      console.error("Hard Delete About Story Error:", error);

      res.status(500).json({
        message: "Failed to delete about story",
        error: error.message,
      });
    }
  },
};

export default aboutStoryController;
