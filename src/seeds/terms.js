import { TermsCollection } from "../db/models/term.js";

const runTermsSeed = async () => {
  try {
    const termsData = ["trial", "month", "year"];
    for (const term of termsData) {
      const newTerm = {
        name: term,
      };
      console.log("new term: ", newTerm);
      await TermsCollection.create(newTerm);
    }
  } catch (error) {
    console.error(error);
  }
};

export default runTermsSeed;
