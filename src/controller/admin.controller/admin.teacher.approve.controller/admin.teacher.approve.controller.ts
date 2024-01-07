import { NextFunction, Request, Response } from 'express';
import { findAllTeacherApplicants, findTeacherApplicantById, searchTeacherApplicants } from '../../../service/admin.service/admin.teacher.approve.service/admin.teacher.approve.service';
import { FindAllTeacherApplicationsSchema, FindUniqueTeacherApplicantSchema, SearchTeacherApplicantSchema } from '../../../schema/admin.dto/admin.teacher.approve.dto/admin.teacher.approve.dto';
//find all applicants
export const findAllTeacherApplicantsHandler = async (req: Request<{}, {}, {}, FindAllTeacherApplicationsSchema['query']>, res: Response, next: NextFunction) => {
    const { page } = req.query;

    if (page) {
        const allApplicant = await findAllTeacherApplicants(+page);
        res.status(200).json(allApplicant);
    } else {
        const page = 0;
        const allApplicant = await findAllTeacherApplicants(page);
        res.status(200).json(allApplicant);
    }
};
// search applicants
export const searchTeacherApplicantsHandler = async (req: Request<{}, {}, {}, SearchTeacherApplicantSchema['query']>, res: Response, next: NextFunction) => {
    const { search, page = 0 } = req.query;

    const searchResult = await searchTeacherApplicants(search, +page);
    res.status(200).json(searchResult);
};

// find unqiue applicant by ID for internal queries
export const findTeacherApplicantByIdHandler = async (req: Request<FindUniqueTeacherApplicantSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const applicant = await findTeacherApplicantById(id);
    res.status(200).json(applicant);
};