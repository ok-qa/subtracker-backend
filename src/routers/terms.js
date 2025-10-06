import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getAllTermsController,
  getTermByIdController,
} from "../controllers/termsControllers.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);
router.get("/", ctrlWrapper(getAllTermsController));
router.get("/:termId", ctrlWrapper(getTermByIdController));

export default router;
