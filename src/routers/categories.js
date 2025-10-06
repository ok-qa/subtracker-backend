import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getAllCategoriesController,
  getCategoryByIdController,
} from "../controllers/categoriesControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);
router.get("/", ctrlWrapper(getAllCategoriesController));
router.get("/:categoryId", ctrlWrapper(getCategoryByIdController));

export default router;
