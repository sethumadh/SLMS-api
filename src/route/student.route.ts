import express from 'express';

import { asyncErrorHandler } from '../utils/asyncErrorHandler';
import validate from '../middleware/validateResource';
import { studentSchema } from '../schema/student.schema';
import { createStudentHandler, deleteManyStudentsHandler, findStudentsHandler } from '../controller/student.controller/student.controller';

const router = express.Router();

router.route('/application/create').post(validate(studentSchema), asyncErrorHandler(createStudentHandler));
router.route('/application/get').get(asyncErrorHandler(findStudentsHandler));
router.route('/application/deleteAllStudents').delete(asyncErrorHandler(deleteManyStudentsHandler));
export default router;
