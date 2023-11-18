import { NextFunction, Request, Response } from 'express';

import {
    changeCurrentTermName,
    createNewTermSetup,
    createNewterm,
    deleteTerm,
    endCurrentTerm,
    extendCurrentTerm,
    findAllTerm,
    findUniqueTerm
} from '../../../service/admin.service/admin.administration.service/admin.administration.service';
import {
    ChangeCurrentTermNameSchema,
    CreateNewTermSetupSchema,
    CreateTermSchema,
    ExtendCurrentTermSchema,
    FindUniqueTermSchema
} from '../../../schema/admin.dto/admin.administartion.dto/admin.administartion.dto';

export const createTermHandler = async (req: Request<{}, {}, CreateTermSchema['body'], {}>, res: Response, next: NextFunction) => {
    const termData = req.body;
    const newterm = await createNewterm(termData);
    res.status(200).json(newterm);
};

export const findUniqueTermHandler = async (req: Request<FindUniqueTermSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const currentTerm = await findUniqueTerm(id);
    res.status(200).json(currentTerm);
};

export const findAllTermHandler = async (req: Request, res: Response, next: NextFunction) => {
    const allTerms = await findAllTerm();
    console.log({ allTerms });
    res.status(200).json(allTerms);
};

export const endTermHandler = async (req: Request<FindUniqueTermSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updatedTerm = await endCurrentTerm(id);
    res.status(200).json(updatedTerm);
};
export const extendCurrentTermHandler = async (req: Request<ExtendCurrentTermSchema['params'], {}, ExtendCurrentTermSchema['body'], {}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const termData= req.body.updatedTerm;
    const updatedTerm = await extendCurrentTerm(id, termData);
    res.status(200).json(updatedTerm);
};
export const changeCurrentTermNameHandler = async (req: Request<ChangeCurrentTermNameSchema['params'], {}, ChangeCurrentTermNameSchema['body'], {}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const termData = req.body.updatedTerm;
    const updatedTerm = await changeCurrentTermName(id, termData);
    res.status(200).json(updatedTerm);
};
export const deleteTermHandler = async (req: Request<FindUniqueTermSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const deletedTerm = await deleteTerm(id);
    res.status(200).json({ message: 'The Term is deleted', deletedTerm });
};
export const createNewTermSetupHandler = async (req: Request<{}, {}, CreateNewTermSetupSchema['body'], {}>, res: Response, next: NextFunction) => {
    const setupOrgData = req.body;

    const newTermwithSubjects = await createNewTermSetup(setupOrgData);
    res.status(200).json(newTermwithSubjects);
};
