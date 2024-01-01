import express from 'express';

import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import validate from '../../../../middleware/validateResource';
import {
    findAllActiveStudentsSchema,
    findStudentFeeDetailsSchema,
    findTermSubjectGroupIdEnrolledSubjectsSchema,
    findUniqueActiveStudentSchema,
    searchActiveStudentsSchema
} from '../../../../schema/admin.dto/admin.student.dto/admin.active.students.dto/admin.active.students.dto';
import {
    findActiveStudentByIdHandler,
    findActiveStudentsHandler,
    findStudentFeeDetailsHandler,
    findTermSubjectGroupIdEnrolledSubjectsHandler,
    searchActiveStudentsHandler
} from '../../../../controller/admin.controller/admin.student.controller/admin.active.students.controller/admin.active.students.controller';

const adminActiveStudentRoute = express.Router();

/*find all enrolled students*/
adminActiveStudentRoute.route('/get-all-active-students').get(validate(findAllActiveStudentsSchema), asyncErrorHandler(findActiveStudentsHandler));

/*search active students*/
adminActiveStudentRoute.route('/search-active-students').get(validate(searchActiveStudentsSchema), asyncErrorHandler(searchActiveStudentsHandler));

/*find unqiue student*/
adminActiveStudentRoute.route('/active-student-detail/:id').get(validate(findUniqueActiveStudentSchema), asyncErrorHandler(findActiveStudentByIdHandler));
/*find unqiue active student fee details*/
adminActiveStudentRoute.route('/active-student-fee-detail/:studentId').get(validate(findStudentFeeDetailsSchema), asyncErrorHandler(findStudentFeeDetailsHandler));
/* find subjects enrolled in a termSubject group*/
adminActiveStudentRoute
    .route('/find-enrolled-subjects-term-subject-group/:id')
    .get(validate(findTermSubjectGroupIdEnrolledSubjectsSchema), asyncErrorHandler(findTermSubjectGroupIdEnrolledSubjectsHandler));

export default adminActiveStudentRoute;
