import { v4 as uuid } from "uuid";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import subscriptions from "../db/subscriptions.json" assert { type: "json" };
import { addSubsValidator } from "../subscriptionsValidator.js";
import {
  getAllSubscriptions,
  getSubscriptionById,
} from "../services/subscriptions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.resolve(__dirname, "../db/subscriptions.json");

const saveSubscriptions = async (subscriptions) => {
  await fs.writeFile(filePath, JSON.stringify(subscriptions, null, 2), "utf-8");
};

export const getAllSubscriptionsController = async (req, res) => {
  const subscriptions = await getAllSubscriptions();
  res.json({
    status: 200,
    message: "Successfully found all subscriptions",
    data: subscriptions,
  });
};

export const getSubscriptionByIdController = async (req, res) => {
  const { id } = req.params;
  const subscription = await getSubscriptionById(id);
  if (!subscription) {
    res.json({
      status: 404,
      message: "Subscription not found",
    });
    return;
  }
  res.json({
    status: 200,
    message: "Successfully found subscription",
    data: subscription,
  });
};

export const addSubscription = async (req, res) => {
  if (!addSubsValidator(req.body)) {
    return res.status(400).json({ error: "invalid field" });
  }
  const newSubscription = {
    id: uuid(),
    ...req.body,
  };

  const updatedSubscriptions = [...subscriptions, newSubscription];

  try {
    saveSubscriptions(updatedSubscriptions);
    res.json({
      message: "Subscription added successfully",
      status: "success",
      code: 201,
    });
  } catch (error) {
    console.error("Failed to write file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateSubscription = async (req, res) => {
  const { id } = req.params;
  if (!addSubsValidator(req.body)) {
    res.status(400).json({ error: "invalid field" });
  }

  // another correct way to find subscription
  //const subscription = subscriptions.filter((item) => item.id === id)[0];
  const [subscription] = subscriptions.filter((item) => item.id === id);
  const updatedSubscription = {
    ...req.body,
    id: subscription.id,
  };

  let newSubscriptions = subscriptions.filter((item) => item.id !== id);
  newSubscriptions.push(updatedSubscription);

  try {
    saveSubscriptions(newSubscriptions);
    res.json({ message: "Subscription updated successfully" });
  } catch (error) {
    console.error("Failed to write file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSubscription = async (req, res) => {
  const { id } = req.params;
  const newSubscriptions = subscriptions.filter((item) => item.id !== id);
  try {
    saveSubscriptions(newSubscriptions);
    res.json({
      message: "Subscription deleted successfully",
      status: "success",
      code: 204,
    });
  } catch (error) {
    console.error("Failed to write file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
