import Joi from "joi";

export const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: false }) // Should be email
    .required(), // Email is required
  password: Joi.string().required(),
});

export const RegisterSchema = Joi.object({
  email: Joi.string().email({ tlds: false }).required().messages({
    "string.base": "Email must me string",
    "string.empty": "Email is required",
    "string.email": "Email is invalid",
    "string.tlds": "Email is invalid",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password must me string",
    "string.empty": "Password is required",
  }),
  confirmPassword: Joi.ref("password"),
});
