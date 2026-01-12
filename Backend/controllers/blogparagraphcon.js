import blogParagraphModel from "../models/blogparagraph.js";


const blogParagraphController = {
  async create(req, res) {
    try {
      const { blog_id, content } = req.body;
      if (!blog_id || !content) return res.status(400).json({ message: "Required fields missing" });
      await blogParagraphModel.create(req.body);
      res.status(201).json({ message: "Paragraph created successfully" });
    } catch (error) {
      console.error("Create Paragraph Error:", error);
      res.status(500).json({ message: "Failed to create paragraph", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogParagraphModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Get All Paragraphs Error:", error);
      res.status(500).json({ message: "Failed to fetch paragraphs", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await blogParagraphModel.getById(id);
      if (!data) return res.status(404).json({ message: "Paragraph not found" });
      res.status(200).json(data);
    } catch (error) {
      console.error("Get Paragraph By ID Error:", error);
      res.status(500).json({ message: "Failed to fetch paragraph", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await blogParagraphModel.update(id, req.body);
      res.status(200).json({ message: "Paragraph updated successfully" });
    } catch (error) {
      console.error("Update Paragraph Error:", error);
      res.status(500).json({ message: "Failed to update paragraph", error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;
      await blogParagraphModel.hardDelete(id);
      res.status(200).json({ message: "Paragraph deleted permanently" });
    } catch (error) {
      console.error("Hard Delete Paragraph Error:", error);
      res.status(500).json({ message: "Failed to delete paragraph", error: error.message });
    }
  },
};

export default blogParagraphController;
