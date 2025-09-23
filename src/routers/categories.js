import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getAllCategoriesController,
  getCategoryByIdController,
} from "../controllers/categoriesControllers.js";

const router = Router();

router.get("/categories", ctrlWrapper(getAllCategoriesController));
router.get("/categories/:categoryId", ctrlWrapper(getCategoryByIdController));

export default router;
