import { SubscriptionsCollection } from "../db/models/subscription.js";

export const getAllSubscriptions = async () => SubscriptionsCollection.find();

export const getSubscriptionById = async (id) =>
  SubscriptionsCollection.findById(id);
