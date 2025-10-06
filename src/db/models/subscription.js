import { Schema, model } from "mongoose";

export const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    // TODO: change to termId
    term: {
      type: Schema.Types.ObjectId,
      ref: "Term",
    },
    endDate: {
      type: Date,
      required: true,
    },

    // TODO: change to categoryId
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const SubscriptionsCollection = model(
  "Subscription",
  subscriptionSchema
);
