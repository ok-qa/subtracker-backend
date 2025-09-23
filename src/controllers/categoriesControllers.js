import { getAllCategories, getCategoryById } from "../services/categories.js";

export const getAllCategoriesController = async (req, res) => {
  const categories = await getAllCategories();
  res.json({
    status: 200,
    message: "Successfully found all categories",
    data: categories,
  });
};

export const getCategoryByIdController = async (req, res) => {
  const { categoryId } = req.params;
  const category = await getCategoryById(categoryId);
  if (!category) {
    res.json({
      status: 404,
      message: "Category not found",
    });
    return;
  }
  res.json({
    status: 200,
    message: "Successfully found category",
    data: category,
  });
};
