import { Schema, model } from "mongoose";

export const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    filterId: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const CategoriesCollection = model("Category", categorySchema);
