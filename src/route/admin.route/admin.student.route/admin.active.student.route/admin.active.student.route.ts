import express from 'express';

import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import validate from '../../../../middleware/validateResource';
import { findAllActiveStudentsSchema } from '../../../../schema/admin.dto/admin.student.dto/admin.active.students.dto/admin.active.students.dto';
import { findActiveStudentsHandler } from '../../../../controller/admin.controller/admin.student.controller/admin.active.students.controller/admin.active.students.controller';

const adminActiveStudentRoute = express.Router();

/*find all enrolled students*/
adminActiveStudentRoute.route('/get-all-active-students').get(validate(findAllActiveStudentsSchema), asyncErrorHandler(findActiveStudentsHandler));
export default adminActiveStudentRoute;
