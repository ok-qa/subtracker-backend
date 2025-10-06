import Joi from "joi";
import joiObjectid from "joi-objectid";

Joi.objectId = joiObjectid(Joi);

export const createSubscriptionsSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().min(0).precision(2).required(),
  term: Joi.objectId().required(),
  endDate: Joi.date().required(),
  category: Joi.objectId().required(),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message("User id should be a valid mongo id");
    }
    return true;
  }),
});

export const updateSubscriptionsSchema = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(0).precision(2),
  term: Joi.objectId(),
  endDate: Joi.date(),
  category: Joi.objectId(),
});
