import { NextFunction, Request, Response } from 'express';

import { customError } from '../../utils/customError';
import { NewApplicantSchema } from '../../schema/new.applicant.dto/new.applicant.dto';

import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import { FindAllStudentSchema, FindUniqueStudentSchema, UpdateStudentPersonalDetailSchema } from '../../schema/admin.dto/admin.student.dto/admin.student.dto';
import { createApplicant, findActiveTerm } from '../../service/new.applicant.service/new.applicant.service';

export const createApplicantHandler = async (req: Request<{}, {}, NewApplicantSchema['body'], {}>, res: Response, next: NextFunction) => {
    const data = req.body;
    const newApplicant = await createApplicant(data);
};
export const findActiveTermHandler = async (req: Request, res: Response, next: NextFunction) => {
    const activeTerm = await findActiveTerm();
    res.status(200).json(activeTerm);
};
