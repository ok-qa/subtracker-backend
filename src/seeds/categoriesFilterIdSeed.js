import { CategoriesCollection } from "../db/models/category.js";

const categoriesFilterId = async () => {
  const categories = await CategoriesCollection.find();
  let index = 0;
  for (const category of categories) {
    category.filterId = index + 1;
    await category.save();
    index++;
  }

  console.log("Successfully filled filter Ids.");
};

export default categoriesFilterId;
