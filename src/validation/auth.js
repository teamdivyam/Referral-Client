import Joi from "joi";

// Common password requirements (reusable)
const passwordRequirements = Joi.string()
  .min(8)
  .max(100)
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, "password")
  .required()
  .messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "string.max": "Password must be less than 25 characters long",
    "string.pattern.name": "password",
    "string.pattern.base":
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
  });

// Login Schema
export const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

// Registration Schema
export const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "Email is required",
      "string.email": "Please enter a valid email address",
    }),
  password: passwordRequirements,
  confirmPassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Passwords must match",
    "string.empty": "Please confirm your password",
  }),
}).with("password", "confirmPassword");

// Additional security validations 
export const securityValidations = {
  // Prevent common passwords
  commonPasswords: (value) => {
    const common = [
      "password",
      "12345678",
      "qwertyui",
      "11111111",
      "admin123",
      "welcome1",
      "sunshine",
      "letmein",
    ];
    if (common.includes(value.toLowerCase())) {
      throw new Error(
        "This password is too common. Please choose a stronger one."
      );
    }
    return true;
  },
  // Prevent sequential characters
  sequentialChars: (value) => {
    if (/(.)\1{3,}/.test(value)) {
      throw new Error("Password contains too many repeated characters");
    }
    if (/1234|2345|3456|4567|5678|6789|7890/.test(value)) {
      throw new Error("Password contains sequential characters");
    }
    return true;
  },
  // Prevent email as part of password
  emailInPassword: (value, { req }) => {
    const email = req?.body?.email || "";
    const emailPart = email.split("@")[0];
    if (emailPart && value.toLowerCase().includes(emailPart.toLowerCase())) {
      throw new Error("Password should not contain your email username");
    }
    return true;
  },
};
