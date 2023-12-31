import express from 'express';

import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import validate from '../../middleware/validateResource';
import { newApplicantSchema } from '../../schema/new.applicant.dto/new.applicant.dto';
import { createApplicantHandler, findPublishTermHandler } from '../../controller/new.applicant.controller/new.applicant.controller';

const newApplicantRoute = express.Router();

newApplicantRoute.route('/create-applicant').post(validate(newApplicantSchema), asyncErrorHandler(createApplicantHandler));
newApplicantRoute.route('/find-published-term').get(asyncErrorHandler(findPublishTermHandler));

// router.route('/application/deleteAllStudents');
export default newApplicantRoute;
