import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper";
import { getAllTermsController } from "../controllers/termsController";

const router = Router();

router.get("/terms", ctrlWrapper(getAllTermsController));

export default router;
