import { getAllCategories } from "../services/getAllCategories";

export const getAllCategoriesController = async (req, res) => {
  const categories = await getAllCategories();
  res.json({
    status: 200,
    message: "Successfully found all categories",
    data: categories,
  });
};

// export const getCategoryByIdController = async (req, res) => {
//   const { id } = req.params;
//   const category = await getCategoryById(id);
//   if (!category) {
//     res.json({
//       status: 404,
//       message: "Category not found",
//     });
//     return;
//   }
//   res.json({
//     status: 200,
//     message: "Successfully found category",
//     data: category,
//   });
// };
