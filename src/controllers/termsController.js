import { getAllTerms } from "../services/getAllTetms";

export const getAllTermsController = async (req, res) => {
  const terms = await getAllTerms();
  res.json({
    status: 200,
    message: "Successfully found all terms",
    data: terms,
  });
};

// export const getTermByIdController = async (req, res) => {
//   const { id } = req.params;
//   const term = await getTermById(id);
//   if (!term) {
//     res.json({
//       status: 404,
//       message: "Term not found",
//     });
//     return;
//   }
//   res.json({
//     status: 200,
//     message: "Successfully found term",
//     data: term,
//   });
// };
