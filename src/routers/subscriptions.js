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
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAllSubscriptionsController));
router.get(
  "/:subscriptionId",
  isValidSubscriptionId,
  ctrlWrapper(getSubscriptionByIdController)
);

router.post(
  "/",
  validateBody(createSubscriptionsSchema),
  ctrlWrapper(addSubscriptionController)
);
router.put(
  "/:subscriptionId",
  validateBody(updateSubscriptionsSchema),
  ctrlWrapper(updateSubscriptionController)
);
router.patch(
  "/:subscriptionId",
  validateBody(updateSubscriptionsSchema),
  ctrlWrapper(patchSubscriptionController)
);
router.delete("/:subscriptionId", ctrlWrapper(deleteSubscriptionController));

export default router;
