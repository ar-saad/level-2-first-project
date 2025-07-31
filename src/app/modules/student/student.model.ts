import { Schema, model, connect } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';
import validator from 'validator';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    validate: {
      validator: function (value: string) {
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

        return firstNameStr === value;
      },
      message:
        '{VALUE} is not a valid first name. The first letter need to be uppercase and other characters lowercase',
    },
  },
  middleName: {
    type: String,
    required: false,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not a valid last name',
    },
  },
});

const guardianSchema = new Schema<Guardian>({
  name: {
    type: String,
    required: [true, 'Guardian name is required'],
    trim: true,
  },
  relationship: {
    type: String,
    required: [true, 'Relationship with guardian is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Guardian contact no is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Guardian occupation is required'],
    trim: true,
  },
});

const studentSchema = new Schema<Student>({
  name: {
    type: userNameSchema,
    required: [true, 'Full name is required'],
    trim: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'Other'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: Date, required: [true, 'Date of birth is required'] },
  email: {
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
    trim: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: '{VALUE} is not a valid email address',
    },
  },
  contactNo: {
    type: String,
    required: [true, 'Contact no is required'],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact no is required'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
      message: '{VALUES} is not a valid blood type',
    },
    required: false,
  },
  presentAddress: { type: String, required: true, trim: true },
  permanentAddress: { type: String, required: true, trim: true },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required'],
  },
  profileImg: { type: String, required: [true, 'Profile picture is required'] },
  isActive: {
    type: Boolean,
    required: [true, 'Active status is required'],
    default: true,
  },
});

export const StudentModel = model<Student>('Student', studentSchema);
