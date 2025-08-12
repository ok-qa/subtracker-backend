import initMongoDB from "./db/initMongoDB.js";
import runAllSeeds from "./seeds/index.js";
import runSubscriptionsSeed from "./seeds/subscriptions.js";
import setupServer from "./server.js";

const bootstrap = async () => {
  await initMongoDB();
  setupServer();
  //   runAllSeeds();

  //   runSubscriptionsSeed();
};

bootstrap();
