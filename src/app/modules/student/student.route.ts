import express from 'express';
import { StudentControllers } from './student.controller';

const router = express.Router();

router.get('/', StudentControllers.getAllStudent);
router.get('/:id', StudentControllers.getStudentById);
router.post('/', StudentControllers.createStudent);
router.delete('/:id', StudentControllers.deleteStudentById);

export const StudentRoutes = router;
