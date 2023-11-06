import express from 'express';

import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import validate from '../../middleware/validateResource';
import { newStudentSchema } from '../../schema/newStudent.dto/newStudent.dto';
import { createStudentHandler } from '../../controller/newStudent.controller/newStudent.controller';


const router = express.Router();

router.route('/application/create').post(validate(newStudentSchema), asyncErrorHandler(createStudentHandler));

// router.route('/application/deleteAllStudents');
export default router;
// findUniqueStudentSchema
