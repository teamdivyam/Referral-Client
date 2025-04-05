import Joi from "joi";

export const ProfileSchema = Joi.object({
  name: Joi.string().required(),
  phoneNumber: Joi.string()
    .regex(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.base": "Phone number must me string",
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number is invalid",
    }),
  addressLine1: Joi.string().required(),
  addressLine2: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
});

export const BankDetailsSchema = Joi.object({
  bankName: Joi.string().required(),
  accountHolderName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  ifscCode: Joi.string().required(),
});