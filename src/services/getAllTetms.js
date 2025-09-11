import { TermsCollection } from "../db/models/term";

export const getAllTerms = () => TermsCollection.find();

export const getTermById = async (id) => TermsCollection.findById(id);
