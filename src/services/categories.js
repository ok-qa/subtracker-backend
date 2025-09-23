import { CategoriesCollection } from "../db/models/category.js";

export const getAllCategories = () => CategoriesCollection.find();

export const getCategoryById = async (id) => CategoriesCollection.findById(id);
