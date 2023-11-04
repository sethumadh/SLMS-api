import express from 'express';

import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import validate from '../middleware/validateResource';
import { findUniqueStudentSchema, studentSchema } from '../schema/student.dto';
import { createStudentHandler, deleteManyStudentsHandler, findAllStudentsHandler, findUniqueStudentHandler } from '../controller/student.controller/student.controller';

const router = express.Router();

router.route('/application/create').post(validate(studentSchema), asyncErrorHandler(createStudentHandler));
router.route('/application/get').get(asyncErrorHandler(findAllStudentsHandler));
router.route('/application/student-detail/:id').get(validate(findUniqueStudentSchema),asyncErrorHandler(findUniqueStudentHandler));
router.route('/application/deleteAllStudents').delete(asyncErrorHandler(deleteManyStudentsHandler));
export default router;
// findUniqueStudentSchema