import { NextFunction, Request, Response } from 'express';

import { FindAllStudentSchema } from '../../../schema/admin.dto/admin.student.dto/admin.student.dto';
import { findAllApplicants, searchApplicants } from '../../../service/admin.service/admin.enrollment.service/admin.enrollment.service';
import { SearchApplicantSchema } from '../../../schema/admin.dto/admin.enrollment.dto/admin.enrollment.dto';

export type FindAllApplicantSchema = FindAllStudentSchema;
export const findAllApplicantsHandler = async (req: Request<{}, {}, {}, FindAllApplicantSchema['query']>, res: Response, next: NextFunction) => {
    const { page } = req.query;

    if (page) {
        const allStudent = await findAllApplicants(+page);
        res.status(200).json(allStudent);
    } else {
        const page = 0;
        const allStudent = await findAllApplicants(page);
        res.status(200).json(allStudent);
    }
};
export const searchApplicantHandler = async (req: Request<{}, {}, {}, SearchApplicantSchema['query']>, res: Response, next: NextFunction) => {
    const { search, page = 0 } = req.query;
    console.log(search)
    const searchResult = await searchApplicants(search, +page);
    res.status(200).json(searchResult);
};
