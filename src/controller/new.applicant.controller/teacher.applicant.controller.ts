import { NextFunction, Request, Response } from 'express';
import { findAllSubjects } from '../../service/new.applicant.service/teacher.applicant.service';

export const findAllSubjectshandler = async (req: Request, res: Response, next: NextFunction) => {
    const allSubjects = await findAllSubjects();
    res.status(200).json(allSubjects);
};
