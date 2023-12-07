import express from 'express';

import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import validate from '../../../middleware/validateResource';

import {
    findAllEnrolledStudentsSchema,
    findUniqueStudentSchema,
    searchEnrolledStudentsSchema,
    updateStudentHealthDetailSchema,
    updateStudentParentsDetailSchema,
    updateStudentPersonalDetailSchema
} from '../../../schema/admin.dto/admin.student.dto/admin.student.dto';
import {
    findAllEnrolledStudentsHandler,
    findStudentByIdHandler,
    searchEnrolledStudentsHandler,
    updateStudentHealthInformationHandler,
    updateStudentParentsDetailHandler,
    updateStudentPersonalDetailHandler
} from '../../../controller/admin.controller/admin.student.controller/admin.student.controller';

const adminStudentRoute = express.Router();

adminStudentRoute.route('/get-all-enrolled-students').get(validate(findAllEnrolledStudentsSchema), asyncErrorHandler(findAllEnrolledStudentsHandler));
/*search enrolled students*/
adminStudentRoute.route('/search-enrolled-students').get( asyncErrorHandler(searchEnrolledStudentsHandler));

adminStudentRoute.route('/student-detail/:id').get(validate(findUniqueStudentSchema), asyncErrorHandler(findStudentByIdHandler));
adminStudentRoute.route('/update-personal-detail/:id').patch(validate(updateStudentPersonalDetailSchema), updateStudentPersonalDetailHandler);
adminStudentRoute.route('/update-parents-detail/:id').patch(validate(updateStudentParentsDetailSchema), updateStudentParentsDetailHandler);
adminStudentRoute.route('/update-health-detail/:id').patch(validate(updateStudentHealthDetailSchema), updateStudentHealthInformationHandler);

// adminStudentRoute.route('/deleteAllStudents');
export default adminStudentRoute;
//searchEnrolledStudentsHandler
