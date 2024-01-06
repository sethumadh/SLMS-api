import express from 'express';
import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import validate from '../../middleware/validateResource';
import { findAllSubjectshandler } from '../../controller/new.applicant.controller/teacher.applicant.controller';

const newteacherApplicantRoute = express.Router();
newteacherApplicantRoute.route('/find-all-subjects').get(asyncErrorHandler(findAllSubjectshandler));

export default newteacherApplicantRoute;
