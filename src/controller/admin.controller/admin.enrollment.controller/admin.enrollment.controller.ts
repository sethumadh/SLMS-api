import { NextFunction, Request, Response } from 'express';

import { FindAllStudentSchema } from '../../../schema/admin.dto/admin.student.dto/admin.student.dto';
import { findAllApplicants, findApplicantById, searchApplicants } from '../../../service/admin.service/admin.enrollment.service/admin.enrollment.service';
import { FindUniqueApplicantSchema, SearchApplicantSchema } from '../../../schema/admin.dto/admin.enrollment.dto/admin.enrollment.dto';

export type FindAllApplicantSchema = FindAllStudentSchema;

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
    console.log(search);
    const searchResult = await searchApplicants(search, +page);
    res.status(200).json(searchResult);
};

// FindUniqueApplicantSchema

// find unqiue applicant by ID for internal queries
export const findApplicantByIdHandler = async (req: Request<FindUniqueApplicantSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const applicant = await findApplicantById(id);
    res.status(200).json(applicant);
};
