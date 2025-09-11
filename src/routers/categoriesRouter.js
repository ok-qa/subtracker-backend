import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { getAllCategoriesController } from "../controllers/categoriesController";

const router = Router();

router.get("/categories", ctrlWrapper(getAllCategoriesController));

export default router;
