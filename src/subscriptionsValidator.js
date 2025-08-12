import { CATEGORIES, TERMS } from "./constants.js";

function validatePrice(priceStr) {
  const price = Number(priceStr);
  if (isNaN(price) || price < 0) {
    return false;
  }
  return true;
}

const validateTerm = (term) => {
  return TERMS.includes(term);
};

const validateDate = (dateStr) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) {
    return false;
  }

  const dateStringWithTimezone = `${dateStr}T00:00:00`;

  const date = new Date(dateStringWithTimezone);

  const [year, month, day] = dateStr.split("-").map(Number);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return false;
  }
  return true;
};

const validateCategory = (category) => {
  return CATEGORIES.includes(category);
};

export const addSubsValidator = (data) => {
  const isNameValid = !!data.name;
  const isPriceValid = validatePrice(data.price);
  const isTermValid = validateTerm(data.term);
  const isDateValid = validateDate(data.endDate);
  const isCategoryValid = validateCategory(data.category);

  const validFields = [
    isNameValid,
    isPriceValid,
    isTermValid,
    isDateValid,
    isCategoryValid,
  ];

  if (validFields.every((item) => item)) {
    return true;
  }
  return false;
};
