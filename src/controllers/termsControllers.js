import { getAllTerms, getTermById } from "../services/terms.js";

export const getAllTermsController = async (req, res) => {
  const terms = await getAllTerms();
  res.json({
    status: 200,
    message: "Successfully found all terms",
    data: terms,
  });
};

export const getTermByIdController = async (req, res) => {
  const { termId } = req.params;
  const term = await getTermById(termId);
  if (!term) {
    res.json({
      status: 404,
      message: "Term not found",
    });
    return;
  }
  res.json({
    status: 200,
    message: "Successfully found term",
    data: term,
  });
};
