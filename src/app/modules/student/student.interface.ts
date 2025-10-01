import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  name: string;
  relationship: string;
  contactNo: string;
  occupation: string;
};

export type TStudent = {
  password: string;
  name: TUserName;
  gender: 'male' | 'female' | 'Other';
  dateOfBirth?: Date;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  profileImg?: string;
  isActive: boolean;
  isDeleted: boolean;
};

// For creating Static Method
export interface StudentModel extends Model<TStudent> {
  isStudentExists(email: string): Promise<TStudent | null>;
}

// For creating Instance Method
// export type StudentMethods = {
//   isStudentExists(email: string): Promise<TStudent | null>;
// };

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >;
