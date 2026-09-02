import { FeatureFlagsCollection } from "../db/models/featureFlag.js";

export const getFeatureFlags = () => FeatureFlagsCollection.find();

export const updateFeatureFlags = async (payload) => {
  const operations = Object.entries(payload).map(([name, value]) => ({
    updateOne: { filter: { name }, update: { $set: { value } } },
  }));

  await FeatureFlagsCollection.bulkWrite(operations);

  return getFeatureFlags();
};
