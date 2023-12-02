import { NextFunction, Request, Response } from 'express';

import { NewApplicantSchema } from '../../schema/new.applicant.dto/new.applicant.dto';
import { createApplicant, findActiveTerm, findPublishTerm } from '../../service/new.applicant.service/new.applicant.service';

export const createApplicantHandler = async (req: Request<{}, {}, NewApplicantSchema['body'], {}>, res: Response, next: NextFunction) => {
    const data = req.body;
    const newApplicant = await createApplicant(data);
    res.status(200).json(newApplicant);
};
export const findActiveTermHandler = async (req: Request, res: Response, next: NextFunction) => {
    const activeTerm = await findActiveTerm();
    res.status(200).json(activeTerm);
};
export const findPublishTermandler = async (req: Request, res: Response, next: NextFunction) => {
    const activeTerm = await findPublishTerm();
    res.status(200).json(activeTerm);
};
