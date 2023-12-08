import express from 'express';

import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import validate from '../../../../middleware/validateResource';

import {
    findAllEnrolledStudentsSchema,
    findUniqueStudentSchema,
    searchEnrolledStudentsSchema,
    updateStudentHealthDetailSchema,
    updateStudentParentsDetailSchema,
    updateStudentPersonalDetailSchema
} from '../../../../schema/admin.dto/admin.student.dto/admin.enrolledstudent/admin.enrolled.student.dto';
import {
    findAllEnrolledStudentsHandler,
    findEnrolledStudentByIdHandler,
    searchEnrolledStudentsHandler,
    updateStudentHealthInformationHandler,
    updateStudentParentsDetailHandler,
    updateStudentPersonalDetailHandler
} from '../../../../controller/admin.controller/admin.student.controller/admin.enrolled.student.controller/admin.enrolled.student.controller';

const adminStudentRoute = express.Router();

adminStudentRoute.route('/get-all-enrolled-students').get(validate(findAllEnrolledStudentsSchema), asyncErrorHandler(findAllEnrolledStudentsHandler));
/*search enrolled students*/
adminStudentRoute.route('/search-enrolled-students').get(asyncErrorHandler(searchEnrolledStudentsHandler));

adminStudentRoute.route('/enrolled-student-detail/:id').get(validate(findUniqueStudentSchema), asyncErrorHandler(findEnrolledStudentByIdHandler));
adminStudentRoute.route('/update-personal-detail/:id').patch(validate(updateStudentPersonalDetailSchema), updateStudentPersonalDetailHandler);
adminStudentRoute.route('/update-parents-detail/:id').patch(validate(updateStudentParentsDetailSchema), updateStudentParentsDetailHandler);
adminStudentRoute.route('/update-health-detail/:id').patch(validate(updateStudentHealthDetailSchema), updateStudentHealthInformationHandler);

// adminStudentRoute.route('/deleteAllStudents');
export default adminStudentRoute;
//searchEnrolledStudentsHandler
