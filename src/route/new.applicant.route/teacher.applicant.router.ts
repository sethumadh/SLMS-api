import express from 'express';
import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import validate from '../../middleware/validateResource';
import { createTeacherApplicantHandler, findAllSubjectshandler } from '../../controller/new.applicant.controller/teacher.applicant.controller';
import { teacherApplicantSchema } from '../../schema/teacher.applicant.dto/teacher.applicant.dto';

const newteacherApplicantRoute = express.Router();
newteacherApplicantRoute.route('/find-all-subjects').get(asyncErrorHandler(findAllSubjectshandler));
newteacherApplicantRoute.route('/create-applicant').post(validate(teacherApplicantSchema), asyncErrorHandler(createTeacherApplicantHandler));

export default newteacherApplicantRoute;
