const parseName = (name) => {
  const isString = typeof name === "string";
  if (!isString || !name) return;

  return name;
};

const parseTerm = (term) => {
  const isString = typeof term === "string";
  if (!isString) return;
  const isTerm = (term) => ["year", "month", "trial"].includes(term);
  if (isTerm(term)) return term;
};

const parseCategory = (categoryIds) => {
  if (!categoryIds) return;

  const source = Array.isArray(categoryIds) ? categoryIds : [categoryIds];

  const allCategoryIdsAreStrings = source.every(
    (categoryId) => typeof categoryId === "string"
  );
  if (!allCategoryIdsAreStrings) return;
  return source.map(Number).filter((value) => !Number.isNaN(value));
};

const parsePrice = (minPrice, maxPrice) => {
  if (!minPrice && !maxPrice) return;

  if (minPrice && !maxPrice) {
    const isString = typeof minPrice === "string";
    if (!isString) return;
    const parsedMinPrice = Number(minPrice);
    if (Number.isNaN(parsedMinPrice)) return;
    return { minPrice: parsedMinPrice };
  }

  if (!minPrice && maxPrice) {
    const isString = typeof maxPrice === "string";
    if (!isString) return;
    const parsedMaxPrice = Number(maxPrice);
    if (Number.isNaN(parsedMaxPrice)) return;
    return { maxPrice: parsedMaxPrice };
  }

  if (minPrice && maxPrice) {
    const isMinPriceString = typeof minPrice === "string";
    const isMaxPriceString = typeof maxPrice === "string";
    if (!isMinPriceString || !isMaxPriceString) return;

    const parsedMinPrice = Number(minPrice);
    const parsedMaxPrice = Number(maxPrice);
    if (Number.isNaN(parsedMinPrice) || Number.isNaN(parsedMaxPrice)) return;

    if (parsedMinPrice < parsedMaxPrice)
      return { minPrice: parsedMinPrice, maxPrice: parsedMaxPrice };
    return;
  }
};

export const parseFilterParams = (query) => {
  const { name, term, categoryIds, minPrice, maxPrice } = query;
  const parsedName = parseName(name);
  const parsedTerm = parseTerm(term);
  const parsedCategory = parseCategory(categoryIds);
  const parsedPrice = parsePrice(minPrice, maxPrice);
  return {
    name: parsedName,
    term: parsedTerm,
    category: parsedCategory,
    price: parsedPrice,
  };
};
