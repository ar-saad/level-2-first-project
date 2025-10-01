import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student.interface';
import validator from 'validator';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
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

const guardianSchema = new Schema<TGuardian>({
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

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
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
    profileImg: {
      type: String,
      required: [true, 'Profile picture is required'],
    },
    isActive: {
      type: Boolean,
      required: [true, 'Active status is required'],
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

// Virtual
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName}${this.name.middleName ? ` ${this.name.middleName} ` : ' '}${this.name.lastName}`;
});

// Pre save middleware/hook : will work on create() and save()
studentSchema.pre('save', async function (next) {
  const student = this;
  // hash the password
  student.password = await bcrypt.hash(
    student.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Post save middleware/hook
studentSchema.post('save', function (doc, next) {
  // Remove the password field when sending the created data
  doc.password = '';
  next();
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// Creating a custom static method
studentSchema.statics.isStudentExists = async function (email: string) {
  const existingStudent = await Student.findOne({ email });
  return existingStudent;
};

// Creating a custom instance method
// studentSchema.methods.isStudentExists = async function (email: string) {
//   const existingStudent = await Student.findOne({ email });
//   return existingStudent;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
