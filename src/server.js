import express from "express";
import cors from "cors";
import {
  addSubscription,
  deleteSubscription,
  getAllSubscriptionsController,
  getSubscriptionByIdController,
  updateSubscription,
} from "./controllers/subControllers.js";

const PORT = 3000;

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.get("/api/subscriptions", getAllSubscriptionsController);
  app.get("/api/subscriptions/:id", getSubscriptionByIdController);
  app.post("/api/subscriptions", addSubscription);
  app.put("/api/subscriptions/:id", updateSubscription);
  app.delete("/api/subscriptions/:id", deleteSubscription);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
