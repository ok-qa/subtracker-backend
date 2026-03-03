import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";
import initMongoDB from "./db/initMongoDB.js";
import runAllSeeds from "./seeds/index.js";
import runSubscriptionsSeed from "./seeds/subscriptions.js";
import setupServer from "./server.js";
import { createDirIfNotExists } from "./utils/createDirIfNotExists.js";

const bootstrap = async () => {
  await initMongoDB();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOAD_DIR);
  setupServer();

  // runAllSeeds();

  //   runSubscriptionsSeed();
};

void bootstrap();
