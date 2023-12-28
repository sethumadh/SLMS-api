import express from 'express';

import validate from '../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import { applicantEnrollDataSchema, findAllApplicantSchema, findUniqueApplicantSchema, searchApplicantSchema } from '../../../schema/admin.dto/admin.enrollment.dto/admin.enrollment.dto';
import {
    deEnrollApplicantHandler,
    enrollApplicantHandler,
    enrollApplicantToStudentHandler,
    findAllApplicantsHandler,
    findApplicantByIdHandler,
    findApplicantEnrolledSubjectsHandler,
    findCurrentTermToEnrollHandler,
    findPublishedTermToEnrollHandler,
    searchApplicantHandler
} from '../../../controller/admin.controller/admin.enrollment.controller/admin.enrollment.controller';

const adminEnrollmentRoute = express.Router();

/*Applicants CRUD*/
adminEnrollmentRoute.route('/get-all-applicants').get(validate(findAllApplicantSchema), asyncErrorHandler(findAllApplicantsHandler));
adminEnrollmentRoute.route('/search-applicants').get(validate(searchApplicantSchema), asyncErrorHandler(searchApplicantHandler));

/* find unique applicant by id*/
adminEnrollmentRoute.route('/applicant-detail/:id').get(validate(findUniqueApplicantSchema), asyncErrorHandler(findApplicantByIdHandler));
/* find published term to enroll */
adminEnrollmentRoute.route('/term-to-enroll').get(asyncErrorHandler(findPublishedTermToEnrollHandler));
/* find current term to enroll */
adminEnrollmentRoute.route('/current-term-to-enroll').get(asyncErrorHandler(findCurrentTermToEnrollHandler));

/*enroll applicant to subject*/
adminEnrollmentRoute.route('/enroll-applicant').post(validate(applicantEnrollDataSchema), asyncErrorHandler(enrollApplicantHandler));
/*find enrolled subject for applicants*/
adminEnrollmentRoute.route('/find-enrolled-subjects-applicant/:id').get(validate(findUniqueApplicantSchema), asyncErrorHandler(findApplicantEnrolledSubjectsHandler));

//***** */  NOT USED *****//
/*enroll the applicant to student*/
adminEnrollmentRoute.route('/enroll-applicant-to-student/:id').post(validate(findUniqueApplicantSchema), asyncErrorHandler(enrollApplicantToStudentHandler));
//***** */  NOT USED *****//

/* de-enroll applicant to subjects */
adminEnrollmentRoute.route('/de-enroll-applicant').post(validate(applicantEnrollDataSchema), asyncErrorHandler(deEnrollApplicantHandler));
export default adminEnrollmentRoute;
