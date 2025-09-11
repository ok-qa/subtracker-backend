import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getAllTermsController,
  getTermByIdController,
} from "../controllers/termsControllers.js";

const router = Router();

router.get("/terms", ctrlWrapper(getAllTermsController));
router.get("/terms/:termId", ctrlWrapper(getTermByIdController));

export default router;
