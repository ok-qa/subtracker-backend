import { FeatureFlagsCollection } from "../db/models/featureFlag.js";

const runFeatureFlagSeed = async () => {
  try {
    const featureFlags = {
      NEW_SUBSCRIPTION_FORM: false,
      CUSTOM_DATEPICKER: false,
    };

    for (const [name, value] of Object.entries(featureFlags)) {
      await FeatureFlagsCollection.create({ name, value });
    }
    console.log("feature flag seed planted");
  } catch (error) {
    console.error("Error seeding feature flags: ", error);
  }
};

export default runFeatureFlagSeed;
