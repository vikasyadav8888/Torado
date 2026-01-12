import blogCategoryModel from "../models/blogcatagory.js";

const blogCategoryController = {
  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ message: "Category name is required" });
      await blogCategoryModel.create(req.body);
      res.status(201).json({ message: "Category created successfully" });
    } catch (error) {
      console.error("Create Category Error:", error);
      res.status(500).json({ message: "Failed to create category", error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const data = await blogCategoryModel.getAll();
      res.status(200).json(data);
    } catch (error) {
      console.error("Get All Categories Error:", error);
      res.status(500).json({ message: "Failed to fetch categories", error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const data = await blogCategoryModel.getById(id);
      if (!data) return res.status(404).json({ message: "Category not found" });
      res.status(200).json(data);
    } catch (error) {
      console.error("Get Category By ID Error:", error);
      res.status(500).json({ message: "Failed to fetch category", error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      await blogCategoryModel.update(id, req.body);
      res.status(200).json({ message: "Category updated successfully" });
    } catch (error) {
      console.error("Update Category Error:", error);
      res.status(500).json({ message: "Failed to update category", error: error.message });
    }
  },

  async hardDelete(req, res) {
    try {
      const { id } = req.params;
      await blogCategoryModel.hardDelete(id);
      res.status(200).json({ message: "Category deleted permanently" });
    } catch (error) {
      console.error("Hard Delete Category Error:", error);
      res.status(500).json({ message: "Failed to delete category", error: error.message });
    }
  },
};

export default blogCategoryController;
