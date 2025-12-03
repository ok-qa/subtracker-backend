import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./routers/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { env } from "./utils/env.js";
import { UPLOAD_DIR } from "./constants/index.js";

const PORT = env("PORT");

const allowedOrigins = env("ALLOWED_ORIGINS").split(",");

const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("CORS not allowed for this origin"));
        }
      },
      credentials: true,
    })
  );
  app.use(cookieParser());

  app.use(apiRouter);

  app.use("/uploads", express.static(UPLOAD_DIR));
  app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "File is too large. Max limit is 3 mb" });
    }
    next(err);
  });

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
