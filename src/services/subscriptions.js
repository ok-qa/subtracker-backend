import { SubscriptionsCollection } from "../db/models/subscription.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllSubscriptions = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const subscriptionsQuery = SubscriptionsCollection.find();
  const subscriptionsCount = await SubscriptionsCollection.find()
    .merge(subscriptionsQuery)
    .countDocuments();

  const subscriptions = await subscriptionsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(
    subscriptionsCount,
    perPage,
    page
  );

  return {
    data: subscriptions,
    ...paginationData,
  };
};

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
