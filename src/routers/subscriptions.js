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
import {
  createSubscriptionsSchema,
  updateSubscriptionsSchema,
} from "../validation/subscriptions.js";
import validateBody from "../middlewares/validateBody.js";
import { isValidSubscriptionId } from "../middlewares/isValidSubscriptionId.js";

const router = Router();

router.get("/subscriptions", ctrlWrapper(getAllSubscriptionsController));
router.get(
  "/subscriptions/:subscriptionId",
  isValidSubscriptionId,
  ctrlWrapper(getSubscriptionByIdController)
);

router.post(
  "/subscriptions",
  validateBody(createSubscriptionsSchema),
  ctrlWrapper(addSubscriptionController)
);
router.put(
  "/subscriptions/:subscriptionId",
  validateBody(updateSubscriptionsSchema),
  ctrlWrapper(updateSubscriptionController)
);
router.patch(
  "/subscriptions/:subscriptionId",
  validateBody(updateSubscriptionsSchema),
  ctrlWrapper(patchSubscriptionController)
);
router.delete(
  "/subscriptions/:subscriptionId",
  ctrlWrapper(deleteSubscriptionController)
);

export default router;
