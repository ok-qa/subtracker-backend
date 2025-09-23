import initMongoDB from "./db/initMongoDB.js";
import categoriesFilterIdSeed from "./seeds/categoriesFilterIdSeed.js";
import runAllSeeds from "./seeds/index.js";
import runSubscriptionsSeed from "./seeds/subscriptions.js";
import setupServer from "./server.js";

const bootstrap = async () => {
  await initMongoDB();
  setupServer();

  // await categoriesFilterIdSeed();

  //   runAllSeeds();

  //   runSubscriptionsSeed();
};

bootstrap();
