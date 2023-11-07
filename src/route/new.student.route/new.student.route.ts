import express from 'express';

import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import validate from '../../middleware/validateResource';
import { newStudentSchema } from '../../schema/new.student.dto/new.student.dto';
import { createStudentHandler } from '../../controller/new.student.controller/new.student.controller';

const newStudentRoute = express.Router();

newStudentRoute.route('/application/create').post(validate(newStudentSchema), asyncErrorHandler(createStudentHandler));

// router.route('/application/deleteAllStudents');
export default newStudentRoute;
// findUniqueStudentSchema
