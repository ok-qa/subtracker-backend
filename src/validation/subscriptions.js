import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi);

export const createSubscriptionsSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.string()
    .pattern(/^\d+(\.\d{1,2})?$/)
    .required(),
  term: Joi.objectId().required(),
  endDate: Joi.date().required(),
  category: Joi.objectId().required(),
});

export const updateSubscriptionsSchema = Joi.object({
  name: Joi.string(),
  price: Joi.string().pattern(/^\d+(\.\d{1,2})?$/),
  term: Joi.objectId(),
  endDate: Joi.date(),
  category: Joi.objectId(),
});
