import runCategoriesSeed from "./categories.js";
import runFeatureFlagSeed from "./featureFlag.js";
import runTermsSeed from "./terms.js";

const runAllSeeds = async () => {
  await runTermsSeed();
  await runCategoriesSeed();
  await runFeatureFlagSeed();

  console.log("All seeds planted");
};

export default runAllSeeds;
