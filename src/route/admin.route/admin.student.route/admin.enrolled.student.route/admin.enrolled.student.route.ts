import express from 'express';

import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import validate from '../../../../middleware/validateResource';

import {
    enrolledStudentEnrollDataSchema,
    findAllEnrolledStudentsSchema,
    findUniqueEnrolledStudentSchema,
    searchEnrolledStudentsSchema,
    updateStudentHealthDetailSchema,
    updateStudentParentsDetailSchema,
    updateStudentPersonalDetailSchema
} from '../../../../schema/admin.dto/admin.student.dto/admin.enrolledstudent/admin.enrolled.student.dto';
import {
    deEnrollStudentEnrolledToSubjectsHandler,
    enrollStudentEnrolledToSubjectsHandler,
    findAllEnrolledStudentsHandler,
    findEnrolledStudentByIdHandler,
    findEnrolledStudentEnrolledSubjectsHandler,
    findTermToEnrollForStudentEnrolledHandler,
    searchEnrolledStudentsHandler,
    updateStudentHealthInformationHandler,
    updateStudentParentsDetailHandler,
    updateStudentPersonalDetailHandler
} from '../../../../controller/admin.controller/admin.student.controller/admin.enrolled.student.controller/admin.enrolled.student.controller';

const adminStudentRoute = express.Router();

adminStudentRoute.route('/get-all-enrolled-students').get(validate(findAllEnrolledStudentsSchema), asyncErrorHandler(findAllEnrolledStudentsHandler));
/*search enrolled students*/
adminStudentRoute.route('/search-enrolled-students').get(asyncErrorHandler(searchEnrolledStudentsHandler));

adminStudentRoute.route('/enrolled-student-detail/:id').get(validate(findUniqueEnrolledStudentSchema), asyncErrorHandler(findEnrolledStudentByIdHandler));
adminStudentRoute.route('/update-personal-detail/:id').patch(validate(updateStudentPersonalDetailSchema), updateStudentPersonalDetailHandler);
adminStudentRoute.route('/update-parents-detail/:id').patch(validate(updateStudentParentsDetailSchema), updateStudentParentsDetailHandler);
adminStudentRoute.route('/update-health-detail/:id').patch(validate(updateStudentHealthDetailSchema), updateStudentHealthInformationHandler);
/* find term to enroll */
adminStudentRoute.route('/term-to-enroll-student-enrolled').get(asyncErrorHandler(findTermToEnrollForStudentEnrolledHandler));
/*find enrolled subject for applicants*/
adminStudentRoute.route('/find-enrolled-subjects-for-enrolled-student/:id').get(validate(findUniqueEnrolledStudentSchema), asyncErrorHandler(findEnrolledStudentEnrolledSubjectsHandler));
/*enroll applicant to subject*/
adminStudentRoute.route('/enroll-enrolled-student').post(validate(enrolledStudentEnrollDataSchema), asyncErrorHandler(enrollStudentEnrolledToSubjectsHandler));
/* de-enroll enrolled student to subjects */
adminStudentRoute.route('/de-enroll-enrolled-student').post(validate(enrolledStudentEnrollDataSchema), asyncErrorHandler(deEnrollStudentEnrolledToSubjectsHandler));

// adminStudentRoute.route('/deleteAllStudents');
export default adminStudentRoute;
//searchEnrolledStudentsHandler
