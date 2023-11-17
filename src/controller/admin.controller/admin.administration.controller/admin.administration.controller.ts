import { NextFunction, Request, Response } from 'express';

import {
    changeCurrentTermName,
    createNewTermSetup,
    createNewterm,
    deleteTerm,
    endCurrentTerm,
    findAllTerm,
    findUniqueTerm
} from '../../../service/admin.service/admin.administration.service/admin.administration.service';
import { ChangeCurrentTermNameSchema, CreateNewTermSetupSchema, CreateTermSchema, FindUniqueTermSchema } from '../../../schema/admin.dto/admin.administartion.dto/admin.administartion.dto';

export const createTermHandler = async (req: Request<{}, {}, CreateTermSchema['body'], {}>, res: Response, next: NextFunction) => {
    /*
        example data
        const termData = {
        name: 'Spring 2024',
        startDate: '2024-03-01T00:00:00.000Z',
        endDate: '2024-06-30T00:00:00.000Z'
    };
    */

    const termData = req.body;
    const newterm = await createNewterm(termData);
    res.status(200).json(newterm);
};

export const findUniqueTermHandler = async (req: Request<FindUniqueTermSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const currentTerm = await findUniqueTerm(id);
    res.status(200).json(currentTerm);
};

export const findAllTermHandler = async (req: Request, res: Response, next: NextFunction) => {
    const allTerms = await findAllTerm();
    console.log({ allTerms });
    res.status(200).json(allTerms);
};

export const endTermHandler = async (req: Request<FindUniqueTermSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const updatedTerm = await endCurrentTerm(id);
    res.status(200).json(updatedTerm);
};
export const changeCurrentTermNameHandler = async (req: Request<ChangeCurrentTermNameSchema['params'], {}, ChangeCurrentTermNameSchema['body'], {}>, res: Response, next: NextFunction) => {
    const id  = req.params;
    const name= req.body.name
    const updatedTerm = await changeCurrentTermName(id, name);
    res.status(200).json(updatedTerm);
};
export const deleteTermHandler = async (req: Request<FindUniqueTermSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedTerm = await deleteTerm(id);
    res.status(200).json({ message: 'The Term is deleted', deletedTerm });
};
export const createNewTermSetupHandler = async (req: Request<{}, {}, CreateNewTermSetupSchema['body'], {}>, res: Response, next: NextFunction) => {
    const setupOrgData = req.body;

    const newTermwithSubjects = await createNewTermSetup(setupOrgData);
    res.status(200).json(newTermwithSubjects);
};
