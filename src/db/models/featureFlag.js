import { model, Schema } from "mongoose";

const featureFlagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const FeatureFlagsCollection = model("featureFlags", featureFlagSchema);
