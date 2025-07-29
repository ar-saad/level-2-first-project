import { Schema, model, connect } from 'mongoose';
import { Guardian, Student, UserName } from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  name: {
    type: String,
    required: true,
  },
  relationship: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: true },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'],
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  profileImg: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

export const StudentModel = model<Student>('Student', studentSchema);
