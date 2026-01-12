import reviewModel from "../models/reviewmodel.js";

const reviewController = {
  async create(req, res) {
    try {
      await reviewModel.create(req.body);
      res.status(201).json({ message: "Review added successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

 async getAll(req, res) {
  try {
    const reviews = await reviewModel.getAll();

    res.status(200).json({
      success: true,
      total: reviews.length,
      data: reviews,
    });
  } catch (error) {
    console.error("REAL SQL ERROR 👉", error);

    res.status(500).json({
      success: false,
      error: error.message, // 👈 yaha change
    });
  }
},


  async hardDelete(req, res) {
    try {
      await reviewModel.hardDelete(req.body);
      res.json({ message: "Review hard deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default reviewController;
