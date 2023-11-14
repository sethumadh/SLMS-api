import express from 'express';

import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import validate from '../../middleware/validateResource';
import { newStudentSchema } from '../../schema/new.student.dto/new.student.dto';
import { createStudentHandler, findActiveTermHandler } from '../../controller/new.student.controller/new.student.controller';

const newStudentRoute = express.Router();

newStudentRoute.route('/new/create').post(validate(newStudentSchema), asyncErrorHandler(createStudentHandler));
newStudentRoute.route('/find-current-term').get(asyncErrorHandler(findActiveTermHandler));

// router.route('/application/deleteAllStudents');
export default newStudentRoute;
// findUniqueStudentSchema
