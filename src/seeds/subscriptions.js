import { CategoriesCollection } from "../db/models/category.js";
import { SubscriptionsCollection } from "../db/models/subscription.js";
import { TermsCollection } from "../db/models/term.js";

const runSubscriptionsSeed = async () => {
  try {
    await SubscriptionsCollection.deleteMany({});

    //terms: year, trial, month
    //category: "Entertainment", "Food & Drinks", "Cloud Storage", "Health & Fitness", "Shopping & Memberships",

    const termsData = await TermsCollection.find();

    const termYear = termsData.find((term) => term.name === "year");
    const termMonth = termsData.find((term) => term.name === "month");
    const termTrial = termsData.find((term) => term.name === "trial");

    const categoriesData = await CategoriesCollection.find();
    const entertainment = categoriesData.find(
      (category) => category.name === "Entertainment"
    );
    const foodDrinks = categoriesData.find(
      (category) => category.name === "Food & Drinks"
    );
    const cloudStorage = categoriesData.find(
      (category) => category.name === "Cloud Storage"
    );
    const healthFitness = categoriesData.find(
      (category) => category.name === "Health & Fitness"
    );
    const shoppingMembership = categoriesData.find(
      (category) => category.name === "Shopping & Memberships"
    );

    const subscriptionData = [
      {
        name: "Amazon",
        price: 120,
        term: termYear.id,
        endDate: "2026-07-21",
        category: shoppingMembership.id,
      },
      {
        name: "Netflix",
        price: 0,
        term: termTrial.id,
        endDate: "2025-08-21",
        category: entertainment.id,
      },
      {
        name: "iCloud",
        price: 5.99,
        term: termMonth.id,
        endDate: "2025-09-30",
        category: cloudStorage.id,
      },
      {
        name: "LAFitness",
        price: 20,
        term: termMonth.id,
        endDate: "2025-08-21",
        category: healthFitness.id,
      },
      {
        name: "Splash",
        price: 56,
        term: termMonth.id,
        endDate: "2025-09-02",
        category: foodDrinks.id,
      },
    ];

    await SubscriptionsCollection.create(subscriptionData);
    console.log("Successfully created subscriptions collection");
  } catch (error) {
    console.log(error);
  }
};

export default runSubscriptionsSeed;
