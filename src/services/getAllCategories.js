import { CategoriesCollection } from "../db/models/category";

export const getAllCategories = () => CategoriesCollection.find();

export const getCategoryById = async (id) => CategoriesCollection.findById(id);
