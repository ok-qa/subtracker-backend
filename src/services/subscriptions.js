import { SubscriptionsCollection } from "../db/models/subscription.js";

export const getAllSubscriptions = () => SubscriptionsCollection.find();

export const getSubscriptionById = (id) => SubscriptionsCollection.findById(id);

export const createSubscription = (payload) =>
  SubscriptionsCollection.create(payload);

export const deleteSubscription = (id) =>
  SubscriptionsCollection.findOneAndDelete({ _id: id });

export const updateSubscription = async (
  subscriptionId,
  payload,
  options = {}
) => {
  const rawResult = await SubscriptionsCollection.findByIdAndUpdate(
    { _id: subscriptionId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    subscription: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
