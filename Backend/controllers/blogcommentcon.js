import blogCommentModel from "../models/blogcomment.js";


const blogCommentController = {
  async create(req, res) {
    try {
      const { blog_id, name, comment } = req.body;
      if (!blog_id || !name || !comment)
        return res.status(400).json({ message: "Required fields missing" });

      await blogCommentModel.create(req.body);
      res.status(201).json({ message: "Comment added successfully" });
    } catch (error) {
      console.error("Create Comment Error:", error);
      res.status(500).json({ message: "Failed to add comment", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogCommentModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Get All Comments Error:", error);
      res.status(500).json({ message: "Failed to fetch comments", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await blogCommentModel.getById(id);
      if (!data) return res.status(404).json({ message: "Comment not found" });
      res.status(200).json(data);
    } catch (error) {
      console.error("Get Comment By ID Error:", error);
      res.status(500).json({ message: "Failed to fetch comment", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await blogCommentModel.update(id, req.body);
      res.status(200).json({ message: "Comment updated successfully" });
    } catch (error) {
      console.error("Update Comment Error:", error);
      res.status(500).json({ message: "Failed to update comment", error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;
      await blogCommentModel.hardDelete(id);
      res.status(200).json({ message: "Comment deleted permanently" });
    } catch (error) {
      console.error("Hard Delete Comment Error:", error);
      res.status(500).json({ message: "Failed to delete comment", error: error.message });
    }
  },
};

export default blogCommentController;
