import createHttpError from "http-errors";
import { FeatureFlagsCollection } from "../db/models/featureFlag.js";

export const getFeatureFlags = () => FeatureFlagsCollection.find();

export const createFeatureFlag = async (payload) => {
  try {
    const [name, value] = Object.entries(payload)[0];
    const result = await FeatureFlagsCollection.create({ name, value });

    if (!result) {
      throw createHttpError(422, "FeatureFlag is not created");
    }

    return getFeatureFlags();
  } catch (error) {
    console.error("error: ", error);

    if (error.code === 11000) {
      throw createHttpError(409, "FeatureFlag is already exist");
    }
  }
};

export const updateFeatureFlags = async (payload) => {
  const operations = Object.entries(payload).map(([name, value]) => ({
    updateOne: { filter: { name }, update: { $set: { value } }, upsert: true },
  }));

  await FeatureFlagsCollection.bulkWrite(operations);

  return getFeatureFlags();
};

export const deleteFeatureFlag = (id) =>
  FeatureFlagsCollection.findOneAndDelete({ _id: id });
