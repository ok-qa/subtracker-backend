import { Router } from "express";
import {
  createFeatureFlagController,
  deleteFeatureFlagController,
  getFeatureFlagsController,
  patchFeatureFlagsController,
} from "../controllers/featureFlagsControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get("/", ctrlWrapper(getFeatureFlagsController));

router.patch("/", ctrlWrapper(patchFeatureFlagsController));

router.post("/", ctrlWrapper(createFeatureFlagController));

router.delete("/:featureFlagId", ctrlWrapper(deleteFeatureFlagController));

export default router;
