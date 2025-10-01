import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      const formatted =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      if (value !== formatted) {
        return helpers.message(
          `"firstName" must start with an uppercase letter followed by lowercase letters`,
        );
      }
      return value;
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[A-Za-z]+$/)
    .messages({
      'string.pattern.base':
        '"lastName" must only contain alphabetic characters',
    }),
});

// Guardian schema
const guardianValidationSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    'string.empty': 'Guardian name is required',
  }),
  relationship: Joi.string().trim().required().messages({
    'string.empty': 'Relationship with guardian is required',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': 'Guardian contact no is required',
  }),
  occupation: Joi.string().trim().required().messages({
    'string.empty': 'Guardian occupation is required',
  }),
});

// Student schema
const studentValidationSchema = Joi.object({
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'Other').required().messages({
    'any.only': '"gender" must be one of [male, female, Other]',
  }),
  dateOfBirth: Joi.date().required().messages({
    'date.base': '"dateOfBirth" must be a valid date',
  }),
  email: Joi.string().trim().email().required().messages({
    'string.email': '"email" must be a valid email address',
  }),
  contactNo: Joi.string().trim().required().messages({
    'string.empty': '"contactNo" is required',
  }),
  emergencyContactNo: Joi.string().trim().required().messages({
    'string.empty': '"emergencyContactNo" is required',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-')
    .optional()
    .messages({
      'any.only': '"bloodGroup" must be a valid blood type',
    }),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': '"presentAddress" is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': '"permanentAddress" is required',
  }),
  guardian: guardianValidationSchema.required(),
  profileImg: Joi.string().uri().required().messages({
    'string.empty': '"profileImg" is required',
    'string.uri': '"profileImg" must be a valid URI',
  }),
  isActive: Joi.boolean().required(),
});

export default studentValidationSchema;
