import { Router } from "express";
import {
  addSubscriptionController,
  deleteSubscriptionController,
  getAllSubscriptionsController,
  getSubscriptionByIdController,
  handleMessagingConnection,
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
import { WebSocketServer } from "ws";

const router = Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getAllSubscriptionsController));
router.get(
  "/:subscriptionId",
  isValidSubscriptionId,
  ctrlWrapper(getSubscriptionByIdController),
);

router.post(
  "/",
  validateBody(createSubscriptionsSchema),
  ctrlWrapper(addSubscriptionController),
);
router.put(
  "/:subscriptionId",
  validateBody(updateSubscriptionsSchema),
  ctrlWrapper(updateSubscriptionController),
);
router.patch(
  "/:subscriptionId",
  validateBody(updateSubscriptionsSchema),
  ctrlWrapper(patchSubscriptionController),
);
router.delete("/:subscriptionId", ctrlWrapper(deleteSubscriptionController));

export function registerWsRoutes(server) {
  const messagingWss = new WebSocketServer({ noServer: true });
  messagingWss.on("connection", handleMessagingConnection);

  const routes = { "/api/subscriptions/messaging": messagingWss };

  server.on("upgrade", (req, socket, head) => {
    const url = req.url;
    const wss = routes[url];
    console.log("url: ", url);
    if (!wss) {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });
}

export default router;
