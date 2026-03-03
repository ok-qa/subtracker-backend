import mongoose from "mongoose";
import { env } from "../utils/env.js";

const initMongoDB = async () => {
  try {
    const isProd = String(env("IS_PROD")) === "true";

    const user = env("MONGODB_USER");
    const pwd = env("MONGODB_PASSWORD");
    const url = env("MONGODB_URL");
    const db = isProd ? env("MONGODB_DB_LIVE") : env("MONGODB_DB");

    await mongoose.connect(
      `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority`,
    );

    const dbType = isProd ? "LIVE_DB" : "DEV_DB";

    console.log(`Mongo connection successfully established on ${dbType}!`);
  } catch (error) {
    console.error("Error while setting up mongo connection", error);
    throw error;
  }
};

export default initMongoDB;
