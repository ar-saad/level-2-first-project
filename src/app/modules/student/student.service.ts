import { Types } from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentService = async (studentData: TStudent) => {
  if (await Student.isStudentExists(studentData.email)) {
    throw new Error('Student already exists');
  }

  const result = await Student.create(studentData); // built-in static method

  // const studentInstance = new Student(studentData); // create an instance

  // if (await studentInstance.isStudentExists(studentData.email)) {
  //   throw new Error('Student already exists');
  // }

  // const result = await studentInstance.save(); // built-in instance method

  return result;
};

const getAllStudentsService = async () => {
  const result = await Student.find();
  return result;
};

const getStudentByIdService = async (id: string) => {
  // const result = await Student.findById(id);

  const result = await Student.aggregate([
    { $match: { _id: new Types.ObjectId(id) } },
  ]);
  console.log(result);

  return result;
};

const deleteStudentByIdService = async (id: string) => {
  const result = await Student.findByIdAndUpdate(id, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
  deleteStudentByIdService,
};
