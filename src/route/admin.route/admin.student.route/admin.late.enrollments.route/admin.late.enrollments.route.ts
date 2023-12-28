import express from 'express';

import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import validate from '../../../../middleware/validateResource';
import {
    findAllLateEnrolledStudentsSchema,
    findLateEnrolledStudentSubjectsSchema,
    findUniqueLateEnrolledStudentSchema,
    lateEnrolledActiveStudentSchema,
    searchlateEnrolledStudentsSchema
} from '../../../../schema/admin.dto/admin.student.dto/admin.late.enrollments.dto/admin.late.enrollments.dto';
import {
    findLateEnrolledStudentByIdHandler,
    findLateEnrolledStudentSubjectsHandler,
    findLateEnrolledStudentsHandler,
    findTermToEnrollForLateEnrolledStudentHandler,
    searchLateEnrolledStudentsHandler,
    deEnrollStudentEnrolledToSubjectsHandler,
    enrollStudentEnrolledToSubjectsHandler,
    lateEnrolledActiveStudentHandler
} from '../../../../controller/admin.controller/admin.student.controller/admin.late.enrollments.controller/admin.late.enrollments.controller';
import { enrolledStudentEnrollDataSchema } from '../../../../schema/admin.dto/admin.student.dto/admin.enrolledstudent/admin.enrolled.student.dto';

const adminLateEnrolledStudentRoute = express.Router();

/*find all late enrolled students*/
adminLateEnrolledStudentRoute.route('/get-all-late-enrolled-students').get(validate(findAllLateEnrolledStudentsSchema), asyncErrorHandler(findLateEnrolledStudentsHandler));

/*search enrolled students*/
adminLateEnrolledStudentRoute.route('/search-all-late-enrolled-students').get(validate(searchlateEnrolledStudentsSchema), asyncErrorHandler(searchLateEnrolledStudentsHandler));
adminLateEnrolledStudentRoute.route('/late-enrolled-student-detail/:id').get(validate(findUniqueLateEnrolledStudentSchema), asyncErrorHandler(findLateEnrolledStudentByIdHandler));
/* find term to enroll */
adminLateEnrolledStudentRoute.route('/term-to-enroll-late-enrolled-student').get(asyncErrorHandler(findTermToEnrollForLateEnrolledStudentHandler));

/*find enrolled subject for applicants*/
adminLateEnrolledStudentRoute
    .route('/find-enrolled-subjects-for-late-enrolled-student/:id/:termId')
    .get(validate(findLateEnrolledStudentSubjectsSchema), asyncErrorHandler(findLateEnrolledStudentSubjectsHandler));
/*enroll applicant to subject*/
adminLateEnrolledStudentRoute.route('/enroll-late-enrolled-student').post(validate(enrolledStudentEnrollDataSchema), asyncErrorHandler(enrollStudentEnrolledToSubjectsHandler));
/* de-enroll enrolled student to subjects */
adminLateEnrolledStudentRoute.route('/de-enroll-late-enrolled-student').post(validate(enrolledStudentEnrollDataSchema), asyncErrorHandler(deEnrollStudentEnrolledToSubjectsHandler));
adminLateEnrolledStudentRoute.route('/enroll-late-enrolled-student-to-active').post(validate(lateEnrolledActiveStudentSchema), asyncErrorHandler(lateEnrolledActiveStudentHandler));
export default adminLateEnrolledStudentRoute;
