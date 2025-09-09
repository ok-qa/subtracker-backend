import { SubscriptionsCollection } from "../db/models/subscription.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllSubscriptions = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const subscriptionsQuery = SubscriptionsCollection.find()
    .populate("term", "name")
    .populate("category", "name");
  const subscriptionsCount = await SubscriptionsCollection.find()
    .merge(subscriptionsQuery)
    .countDocuments();

  const subscriptions = await subscriptionsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

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

export const getSubscriptionById = (id) =>
  SubscriptionsCollection.findById(id)
    .populate("term", "name")
    .populate("category", "name");

export const createSubscription = async (payload) => {
  const newSubscription = await SubscriptionsCollection.create(payload);
  const populatedSubscription = await SubscriptionsCollection.findById(
    newSubscription._id
  )
    .populate("term", "name")
    .populate("category", "name");

  return populatedSubscription;
};

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

  const populatedSubscription = await SubscriptionsCollection.findById(
    rawResult.value._id
  )
    .populate("term", "name")
    .populate("category", "name");

  return {
    subscription: populatedSubscription,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
