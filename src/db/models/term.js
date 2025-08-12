import { Schema, model } from "mongoose";
export const termSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["year", "month", "trial"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TermsCollection = model("Term", termSchema);
