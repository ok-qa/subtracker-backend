import createHttpError from "http-errors";
import {
  createSubscription,
  deleteSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
} from "../services/subscriptions.js";

export const getAllSubscriptionsController = async (req, res, next) => {
  const subscriptions = await getAllSubscriptions();
  res.json({
    status: 200,
    message: "Successfully found all subscriptions",
    data: subscriptions,
  });
};

export const getSubscriptionByIdController = async (req, res) => {
  const { subscriptionId } = req.params;
  const subscription = await getSubscriptionById(subscriptionId);
  if (!subscription) {
    throw createHttpError(404, "Subscription not found");
  }
  res.json({
    status: 200,
    message: "Successfully found subscription",
    data: subscription,
  });
};

export const addSubscriptionController = async (req, res) => {
  const subscription = await createSubscription(req.body);

  res.status(201).json({
    status: 201,
    message: "Successfully added a subscription",
    data: subscription,
  });
};

export const updateSubscriptionController = async (req, res, next) => {
  const { subscriptionId } = req.params;

  const result = await updateSubscription(subscriptionId, req.body);

  if (!result) {
    next(createHttpError(404, "Subscription nor found"));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a subscription!`,
    data: result.subscription,
  });
};

export const patchSubscriptionController = async (req, res, next) => {
  const { subscriptionId } = req.params;
  const result = await updateSubscription(subscriptionId, req.body);

  if (!result) {
    next(createHttpError(404, "Subscription nor found"));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a subscription!`,
    data: result.subscription,
  });
};

export const deleteSubscriptionController = async (req, res, next) => {
  const { subscriptionId } = req.params;
  const subscription = await deleteSubscription(subscriptionId);
  if (!subscription) {
    throw createHttpError(404, "Subscription not found");
  }
  res.status(204).send();
};
