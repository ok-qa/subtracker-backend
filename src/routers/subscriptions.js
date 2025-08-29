import { Router } from "express";
import {
  addSubscriptionController,
  deleteSubscriptionController,
  getAllSubscriptionsController,
  getSubscriptionByIdController,
  patchSubscriptionController,
  updateSubscriptionController,
} from "../controllers/subControllers.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = Router();

router.get("/subscriptions", ctrlWrapper(getAllSubscriptionsController));
router.get("/subscriptions/:id", ctrlWrapper(getSubscriptionByIdController));

router.post("/subscriptions", ctrlWrapper(addSubscriptionController));
router.put("/subscriptions/:id", ctrlWrapper(updateSubscriptionController));
router.patch("/subscriptions/:id", ctrlWrapper(patchSubscriptionController));
router.delete("/subscriptions/:id", ctrlWrapper(deleteSubscriptionController));

export default router;
