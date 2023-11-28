import express from 'express';

import validate from '../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import { findAllApplicantSchema, findUniqueApplicantSchema, searchApplicantSchema } from '../../../schema/admin.dto/admin.enrollment.dto/admin.enrollment.dto';
import { findAllApplicantsHandler, findApplicantByIdHandler, searchApplicantHandler } from '../../../controller/admin.controller/admin.enrollment.controller/admin.enrollment.controller';

const adminEnrollmentRoute = express.Router();

/*Applicants CRUD*/
adminEnrollmentRoute.route('/get-all-applicants').get(validate(findAllApplicantSchema), asyncErrorHandler(findAllApplicantsHandler));
adminEnrollmentRoute.route('/search-applicants').get(validate(searchApplicantSchema), asyncErrorHandler(searchApplicantHandler));

/* find unique applicant by id*/
adminEnrollmentRoute.route('/applicant-detail/:id').get(validate(findUniqueApplicantSchema), asyncErrorHandler(findApplicantByIdHandler));

export default adminEnrollmentRoute;
