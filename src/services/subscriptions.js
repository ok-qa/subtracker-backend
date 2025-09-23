import { SORT_ORDER } from "../constants/index.js";
import { CategoriesCollection } from "../db/models/category.js";
import { SubscriptionsCollection } from "../db/models/subscription.js";
import { TermsCollection } from "../db/models/term.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllSubscriptions = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const termDoc = filter.term
    ? await TermsCollection.findOne({ name: filter.term })
    : null;

  const categories = await CategoriesCollection.find(
    { filterId: { $in: filter.category } },
    "_id"
  ).lean();

  const categoryObjectIds = categories.map((category) => category._id);

  const subscriptionsQuery = SubscriptionsCollection.find().populate(
    "category",
    "name"
  );

  if (filter.name) {
    subscriptionsQuery.where("name").regex(new RegExp(filter.name, "i"));
  }
  if (filter.term) {
    subscriptionsQuery.where("term").equals(termDoc._id);
  }
  if (filter.category) {
    subscriptionsQuery.where("category").in(categoryObjectIds);
  }
  if (filter.price?.minPrice !== undefined) {
    subscriptionsQuery.where("price").gte(filter.price.minPrice);
  }
  if (filter.price?.maxPrice !== undefined) {
    subscriptionsQuery.where("price").lte(filter.price.maxPrice);
  }

  const testSubscription = await SubscriptionsCollection.find({
    price: { $type: "string" },
  });

  const subscriptionsCount = await SubscriptionsCollection.find()
    .merge(subscriptionsQuery)
    .countDocuments();

  const subscriptions = await subscriptionsQuery
    .skip(skip)
    .limit(limit)
    .populate("term", "name")
    .sort({ [sortBy]: sortOrder === SORT_ORDER.DESC ? -1 : 1 })
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
