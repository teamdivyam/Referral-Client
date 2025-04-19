import Joi from "joi";

export const profileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .messages({
      "string.empty": "Full name is required",
      "string.min": "Name must be at least 2 characters long",
      "string.max": "Name must be less than 100 characters",
      "string.pattern.base":
        "Name can only contain letters, spaces, hyphens, and apostrophes",
    }),

  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.length": "Phone number must be exactly 10 digits",
      "string.pattern.base": "Phone number can only contain digits",
    }),

  addressLine1: Joi.string().min(5).max(100).required().messages({
    "string.empty": "Address line 1 is required",
    "string.min": "Address must be at least 5 characters long",
    "string.max": "Address must be less than 100 characters",
  }),

  addressLine2: Joi.string().max(100).allow("").optional().messages({
    "string.max": "Address line 2 must be less than 100 characters",
  }),

  city: Joi.string()
    .min(2)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z\s-]+$/)
    .messages({
      "string.empty": "City is required",
      "string.min": "City name must be at least 2 characters long",
      "string.max": "City name must be less than 50 characters",
      "string.pattern.base":
        "City name can only contain letters, spaces, and hyphens",
    }),

  state: Joi.string()
    .min(2)
    .max(50)
    .required()
    .pattern(/^[a-zA-Z\s-]+$/)
    .messages({
      "string.empty": "State is required",
      "string.min": "State name must be at least 2 characters long",
      "string.max": "State name must be less than 50 characters",
      "string.pattern.base":
        "State name can only contain letters, spaces, and hyphens",
    }),
}).options({ abortEarly: false });

export const bankSchema = Joi.object({
  bankName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z\s.-]+$/)
    .messages({
      'string.empty': 'Bank name is required',
      'string.min': 'Bank name must be at least 3 characters',
      'string.max': 'Bank name must be less than 100 characters',
      'string.pattern.base': 'Bank name can only contain letters, spaces, dots and hyphens'
    }),

  accountHolderName: Joi.string()
    .min(3)
    .max(100)
    .required()
    .pattern(/^[a-zA-Z\s'-]+$/)
    .messages({
      'string.empty': 'Account holder name is required',
      'string.min': 'Name must be at least 3 characters',
      'string.max': 'Name must be less than 100 characters',
      'string.pattern.base': 'Name can only contain letters, spaces, hyphens and apostrophes'
    }),

  accountNumber: Joi.string()
    .min(9)
    .max(18)
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.empty': 'Account number is required',
      'string.min': 'Account number must be at least 9 digits',
      'string.max': 'Account number must be less than 18 digits',
      'string.pattern.base': 'Account number can only contain numbers'
    }),

  ifscCode: Joi.string()
    .length(11)
    .required()
    .pattern(/^[A-Za-z]{4}0[A-Za-z0-9]{6}$/)
    .messages({
      'string.empty': 'IFSC code is required',
      'string.length': 'IFSC code must be exactly 11 characters',
      'string.pattern.base': 'Invalid IFSC code format (e.g. ABCD0123456)'
    })
}).options({ abortEarly: false });

export const requestAmountSchema = Joi.object({
  amount: Joi.number().required().messages({
    "number.base": "Amount must be a number",
    "number.empty": "Amount is required",
    "any.required": "Amount is required",
  }),
});