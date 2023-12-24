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

const adminEnrolledStudentRoute = express.Router();
/*find all enrolled students*/
adminEnrolledStudentRoute.route('/get-all-enrolled-students').get(validate(findAllEnrolledStudentsSchema), asyncErrorHandler(findAllEnrolledStudentsHandler));

/*search enrolled students*/
adminEnrolledStudentRoute.route('/search-enrolled-students').get(asyncErrorHandler(searchEnrolledStudentsHandler));

adminEnrolledStudentRoute.route('/enrolled-student-detail/:id').get(validate(findUniqueEnrolledStudentSchema), asyncErrorHandler(findEnrolledStudentByIdHandler));
adminEnrolledStudentRoute.route('/update-personal-detail/:id').patch(validate(updateStudentPersonalDetailSchema), updateStudentPersonalDetailHandler);
adminEnrolledStudentRoute.route('/update-parents-detail/:id').patch(validate(updateStudentParentsDetailSchema), updateStudentParentsDetailHandler);
adminEnrolledStudentRoute.route('/update-health-detail/:id').patch(validate(updateStudentHealthDetailSchema), updateStudentHealthInformationHandler);
/* find term to enroll */
adminEnrolledStudentRoute.route('/term-to-enroll-student-enrolled').get(asyncErrorHandler(findTermToEnrollForStudentEnrolledHandler));
/*find enrolled subject for applicants*/
adminEnrolledStudentRoute.route('/find-enrolled-subjects-for-enrolled-student/:id').get(validate(findUniqueEnrolledStudentSchema), asyncErrorHandler(findEnrolledStudentEnrolledSubjectsHandler));
/*enroll applicant to subject*/
adminEnrolledStudentRoute.route('/enroll-enrolled-student').post(validate(enrolledStudentEnrollDataSchema), asyncErrorHandler(enrollStudentEnrolledToSubjectsHandler));
/* de-enroll enrolled student to subjects */
adminEnrolledStudentRoute.route('/de-enroll-enrolled-student').post(validate(enrolledStudentEnrollDataSchema), asyncErrorHandler(deEnrollStudentEnrolledToSubjectsHandler));

// adminEnrolledStudentRoute.route('/deleteAllStudents');
export default adminEnrolledStudentRoute;
