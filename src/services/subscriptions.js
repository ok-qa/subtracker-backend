import createHttpError from "http-errors";
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
  user,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const termDoc = filter.term
    ? await TermsCollection.findOne({ name: filter.term })
    : null;

  const categories = await CategoriesCollection.find(
    { filterId: { $in: filter.category } },
    "_id",
  ).lean();

  const categoryObjectIds = categories.map((category) => category._id);

  const subscriptionsQuery = SubscriptionsCollection.find().populate(
    "category",
    "name",
  );

  subscriptionsQuery.where("userId").equals(user._id);

  if (filter.name) {
    const parsedSearch = filter.name.replaceAll("+", "\\+");
    subscriptionsQuery.where("name").regex(new RegExp(parsedSearch, "i"));
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

  const subscriptionsCount = await SubscriptionsCollection.find()
    .merge(subscriptionsQuery)
    .countDocuments();

  const allSubscriptions = await subscriptionsQuery
    .clone()
    .populate("term", "name")
    .exec();

  const today = new Date();
  const activeSubscriptions = allSubscriptions.filter((item) => {
    return item.endDate > today;
  });

  const weekStart = new Date();
  weekStart.setHours(0, 0, 0, 0);
  const day = weekStart.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  weekStart.setDate(weekStart.getDate() + diffToMonday);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  let renewalColor = "orange";

  const upcomingRenewal = activeSubscriptions.filter((item) => {
    const isCurrentWeek = item.endDate >= weekStart && item.endDate < weekEnd;
    if (isCurrentWeek && renewalColor !== "red") {
      const isToday =
        item.endDate.getFullYear() === today.getFullYear() &&
        item.endDate.getMonth() === today.getMonth() &&
        item.endDate.getDate() === today.getDate();
      if (isToday) {
        renewalColor = "red";
      }
    }
    return isCurrentWeek;
  });

  const totalMonthlyCost = activeSubscriptions.reduce((sum, sub) => {
    if (sub.term.name === "trial") return sum;
    const price = Number(sub.price) || 0;

    const monthly = sub.term.name === "year" ? price / 12 : price;
    return sum + monthly;
  }, 0);

  const subscriptions = await subscriptionsQuery
    .skip(skip)
    .limit(limit)
    .populate("category", "name")
    .populate("term", "name")
    .sort({ [sortBy]: sortOrder === SORT_ORDER.DESC ? -1 : 1 })
    .exec();

  const paginationData = calculatePaginationData(
    subscriptionsCount,
    perPage,
    page,
  );

  const subscriptionCalculations = {
    activeSubscriptionsCount: activeSubscriptions.length,
    totalMonthlyCost,
    renewalColor,
    upcomingRenewalCount: upcomingRenewal.length,
  };

  return {
    data: subscriptions,
    ...paginationData,
    ...subscriptionCalculations,
  };
};

export const getSubscriptionById = (id) =>
  SubscriptionsCollection.findById(id)
    .populate("term", "name")
    .populate("category", "name");

// TODO: fix subscription creation case with invalid termId and categoryId
export const createSubscription = async (payload) => {
  const { category, term } = payload;
  const categoryExists = await CategoriesCollection.findById(category);
  if (!categoryExists) {
    throw createHttpError(400, "Category id is invalid");
  }
  const termExists = await TermsCollection.findById(term);
  if (!termExists) {
    throw createHttpError(400, "Term id is invalid");
  }
  const newSubscription = await SubscriptionsCollection.create(payload);
  const populatedSubscription = await SubscriptionsCollection.findById(
    newSubscription._id,
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
  options = {},
) => {
  const rawResult = await SubscriptionsCollection.findByIdAndUpdate(
    { _id: subscriptionId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  )
    .populate("term", "name")
    .populate("category", "name");
  if (!rawResult || !rawResult.value) return null;

  const populatedSubscription = await SubscriptionsCollection.findById(
    rawResult.value._id,
  )
    .populate("term", "name")
    .populate("category", "name");

  return {
    subscription: populatedSubscription,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteUsersSubscriptions = (userId) =>
  SubscriptionsCollection.deleteMany({ userId });
