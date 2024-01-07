import express from 'express';

import validate from '../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import { findAllTeacherApplicantsHandler, findTeacherApplicantByIdHandler, searchTeacherApplicantsHandler } from '../../../controller/admin.controller/admin.teacher.approve.controller/admin.teacher.approve.controller';
import { findAllTeacherApplicationsSchema, findUniqueTeacherApplicantSchema, searchTeacherApplicantSchema } from '../../../schema/admin.dto/admin.teacher.approve.dto/admin.teacher.approve.dto';

const adminTeacherApproveRoute = express.Router();

/*Applicants CRUD*/
adminTeacherApproveRoute.route('/get-all-applicants').get(validate(findAllTeacherApplicationsSchema), asyncErrorHandler(findAllTeacherApplicantsHandler));
adminTeacherApproveRoute.route('/search-applicants').get(validate(searchTeacherApplicantSchema), asyncErrorHandler(searchTeacherApplicantsHandler));

/* find unique applicant by id*/
adminTeacherApproveRoute.route('/applicant-detail/:id').get(validate(findUniqueTeacherApplicantSchema), asyncErrorHandler(findTeacherApplicantByIdHandler));


/* find published term to enroll */

export default adminTeacherApproveRoute;
