import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentValidationSchema } from './student.validation';
// import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // Data validation using Zod
    const zodParsedData = studentValidationSchema.parse(studentData);

    // send validated data to the service
    const result = await StudentServices.createStudentService(zodParsedData);

    // Logic to create a student
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create student',
      error,
    });
  }
};

const getAllStudent = async (req: Request, res: Response) => {
  try {
    // call service
    const result = await StudentServices.getAllStudentsService();

    // send response
    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch student data',
      error,
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // call service
    const result = await StudentServices.getStudentByIdService(id);

    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get student data',
      error,
    });
  }
};

const deleteStudentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await StudentServices.deleteStudentByIdService(id);

    res.status(200).json({
      success: true,
      message: 'Student delete successfully',
      data: result,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getStudentById,
  deleteStudentById,
};
