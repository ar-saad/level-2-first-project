import { Student } from './student.interface';
import { StudentModel } from './student.model';

const createStudentService = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};

const getAllStudentsService = async () => {
  const result = await StudentModel.find();
  return result;
};

const getStudentByIdService = async (id: string) => {
  const result = await StudentModel.findById(id);
  return result;
};

export const StudentServices = {
  createStudentService,
  getAllStudentsService,
  getStudentByIdService,
};
