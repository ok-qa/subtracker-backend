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

    let index = 0;

    for (const category of categoriesData) {
      const newCategory = {
        name: category,
        filterId: index + 1,
      };
      await CategoriesCollection.create(newCategory);
      index++;
    }
  } catch (error) {
    console.error(error);
  }
};

export default runCategoriesSeed;
