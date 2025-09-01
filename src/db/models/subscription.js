import { Schema, model } from "mongoose";

export const subscriptionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //TODO: change price to number
    price: {
      type: String,
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
