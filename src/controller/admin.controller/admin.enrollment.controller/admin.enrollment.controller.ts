import { NextFunction, Request, Response } from 'express';

import { FindAllEnrolledStudentsSchema } from '../../../schema/admin.dto/admin.student.dto/admin.enrolledstudent/admin.enrolled.student.dto';
import {
    deEnrollApplicant,
    enrollApplicant,
    enrollApplicantToStudent,
    findAllApplicants,
    findApplicantById,
    findApplicantEnrolledSubjects,
    findCurrentTermToEnroll,
    findPublishedTermToEnroll,
    searchApplicants
} from '../../../service/admin.service/admin.enrollment.service/admin.enrollment.service';
import { ApplicantEnrollDataSchema, FindUniqueApplicantSchema, SearchApplicantSchema } from '../../../schema/admin.dto/admin.enrollment.dto/admin.enrollment.dto';

export type FindAllApplicantSchema = FindAllEnrolledStudentsSchema;

//find all applicants
export const findAllApplicantsHandler = async (req: Request<{}, {}, {}, FindAllApplicantSchema['query']>, res: Response, next: NextFunction) => {
    const { page } = req.query;

    if (page) {
        const allApplicant = await findAllApplicants(+page);
        res.status(200).json(allApplicant);
    } else {
        const page = 0;
        const allApplicant = await findAllApplicants(page);
        res.status(200).json(allApplicant);
    }
};
// search applicants
export const searchApplicantHandler = async (req: Request<{}, {}, {}, SearchApplicantSchema['query']>, res: Response, next: NextFunction) => {
    const { search, page = 0 } = req.query;

    const searchResult = await searchApplicants(search, +page);
    res.status(200).json(searchResult);
};

// find unqiue applicant by ID for internal queries
export const findApplicantByIdHandler = async (req: Request<FindUniqueApplicantSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const applicant = await findApplicantById(id);
    res.status(200).json(applicant);
};
export const findPublishedTermToEnrollHandler = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const termToEnroll = await findPublishedTermToEnroll();
    res.status(200).json(termToEnroll);
};
export const findCurrentTermToEnrollHandler = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const termToEnroll = await findCurrentTermToEnroll();
    res.status(200).json(termToEnroll);
};

//  enroll Applicant to subjects
export const enrollApplicantHandler = async (req: Request<{}, {}, ApplicantEnrollDataSchema['body'], {}>, res: Response, next: NextFunction) => {
    const enrollData = req.body;
    const termToEnroll = await enrollApplicant(enrollData);
    res.status(200).json(termToEnroll);
};

/* de-enroll applicant to subjects */
export const deEnrollApplicantHandler = async (req: Request<{}, {}, ApplicantEnrollDataSchema['body'], {}>, res: Response, next: NextFunction) => {
    const enrollData = req.body;
    const termToEnroll = await deEnrollApplicant(enrollData);
    res.status(200).json(termToEnroll);
};

export const findApplicantEnrolledSubjectsHandler = async (req: Request<FindUniqueApplicantSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const enrolledSubjects = await findApplicantEnrolledSubjects(id);
    res.status(200).json(enrolledSubjects);
};
export const enrollApplicantToStudentHandler = async (req: Request<FindUniqueApplicantSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const enrolledSubjects = await enrollApplicantToStudent(+id);
    res.status(200).json(enrolledSubjects);
};
