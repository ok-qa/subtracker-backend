import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

export const isValidSubscriptionId = (req, res, next) => {
  const { subscriptionId } = req.params;

  if (!isValidObjectId(subscriptionId)) {
    throw createHttpError(400, "Bad request!");
  }

  next();
};

//TODO make middleware unified for all Ids
