import { Router } from "express";
import { getFeatureFlagsController, patchFeatureFlagsController } from "../controllers/featureFlagsControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get("/", ctrlWrapper(getFeatureFlagsController));

router.patch("/", ctrlWrapper(patchFeatureFlagsController));

export default router;
