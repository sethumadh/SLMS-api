import express from 'express';

import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import validate from '../middleware/validateResource';
import { findAllStudentSchema, findUniqueStudentSchema, studentSchema } from '../schema/student.dto';
import { createStudentHandler, deleteManyStudentsHandler, findAllStudentsHandler, findStudentByIdHandler } from '../controller/student.controller/student.controller';

const router = express.Router();

router.route('/application/create').post(validate(studentSchema), asyncErrorHandler(createStudentHandler));
router.route('/application/get').get(validate(findAllStudentSchema),asyncErrorHandler(findAllStudentsHandler));
router.route('/application/student-detail/:id').get(validate(findUniqueStudentSchema), asyncErrorHandler(findStudentByIdHandler));
router.route('/application/deleteAllStudents');
export default router;
// findUniqueStudentSchema
