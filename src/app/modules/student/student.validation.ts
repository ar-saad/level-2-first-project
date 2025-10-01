import { z } from 'zod';

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty('First name is required')
    .refine(
      (val) => val === val.charAt(0).toUpperCase() + val.slice(1).toLowerCase(),
      {
        message:
          'First letter must be uppercase and the rest lowercase (e.g. John)',
      },
    ),
  middleName: z.string().trim().optional(),
  lastName: z
    .string()
    .trim()
    .nonempty('Last name is required')
    .regex(/^[A-Za-z]+$/, 'Last name must contain only letters'),
});

// Guardian schema
const guardianValidationSchema = z.object({
  name: z.string().trim().nonempty('Guardian name is required'),
  relationship: z
    .string()
    .trim()
    .nonempty('Relationship with guardian is required'),
  contactNo: z.string().trim().nonempty('Guardian contact no is required'),
  occupation: z.string().trim().nonempty('Guardian occupation is required'),
});

// Student schema
export const studentValidationSchema = z.object({
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'Other'], {
    message: 'Gender must be male, female, or Other',
  }),
  dateOfBirth: z.coerce
    .date()
    .refine((val) => val instanceof Date && !isNaN(val.getTime()), {
      message: 'Invalid date format',
    }),

  email: z
    .string()
    .trim()
    .nonempty('Email address is required')
    .email('Invalid email address'),
  contactNo: z.string().trim().nonempty('Contact no is required'),
  emergencyContactNo: z
    .string()
    .trim()
    .nonempty('Emergency contact no is required'),
  bloodGroup: z
    .enum(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'])
    .optional(),
  presentAddress: z.string().trim().nonempty('Present address is required'),
  permanentAddress: z.string().trim().nonempty('Permanent address is required'),
  guardian: guardianValidationSchema,
  profileImg: z.string().nonempty('Profile picture is required'),
  isActive: z.boolean().default(true),
  isDeleted: z.boolean().default(false),
});
