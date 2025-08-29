import express from "express";
import cors from "cors";

import apiRouter from "./routers/index.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = 3000;

const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(apiRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
