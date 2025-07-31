import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // Data validation using Joi
    const { error, value } = studentValidationSchema.validate(studentData);

    if (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch student data',
        error,
      });
    }

    // send validated data to the service
    const result = await StudentServices.createStudentService(value);

    // Logic to create a student
    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to create student',
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student data',
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'Failed to get student data',
      error,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudent,
  getStudentById,
};
