import { CategoriesCollection } from "../db/models/category.js";

const runCategoriesSeed = async () => {
  try {
    const categoriesData = [
      "Entertainment",
      "Financial & Utilities",
      "Food & Drinks",
      "Gaming",
      "Cloud Storage",
      "Mobile and Internet",
      "Software & Productivity",
      "Shopping & Memberships",
      "Pets",
      "Health & Fitness",
      "News",
      "Education",
      "Food",
    ];
    for (const category of categoriesData) {
      const newCategory = {
        name: category,
      };
      await CategoriesCollection.create(newCategory);
    }
  } catch (error) {
    console.error(error);
  }
};

export default runCategoriesSeed;
