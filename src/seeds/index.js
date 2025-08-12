import runCategoriesSeed from "./categories.js";
import runTermsSeed from "./terms.js";

const runAllSeeds = async () => {
  await runTermsSeed();
  await runCategoriesSeed();

  console.log("All seeds planted");
};

export default runAllSeeds;
