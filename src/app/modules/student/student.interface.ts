export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  name: string;
  relationship: string;
  contactNo: string;
  occupation: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup: 'A+' | 'B+' | 'AB+' | 'O+' | 'A-' | 'B-' | 'AB-' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  profileImg?: string;
  isActive: boolean;
};
