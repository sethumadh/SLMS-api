import express from 'express';

import validate from '../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import { findAllApplicantSchema, searchApplicantSchema } from '../../../schema/admin.dto/admin.enrollment.dto/admin.enrollment.dto';
import { findAllApplicantsHandler, searchApplicantHandler } from '../../../controller/admin.controller/admin.enrollment.controller/admin.enrollment.controller';

const adminEnrollmentRoute = express.Router();

/*Applicants CRUD*/
adminEnrollmentRoute.route('/get-all-applicants').get(validate(findAllApplicantSchema), asyncErrorHandler(findAllApplicantsHandler));

adminEnrollmentRoute.route('/search-applicants').get(validate(searchApplicantSchema), asyncErrorHandler(searchApplicantHandler));

export default adminEnrollmentRoute;
