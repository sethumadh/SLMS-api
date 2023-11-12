import { NextFunction, Request, Response } from 'express';

import { createNewterm, deleteTerm, endCurrentTerm, findAllTerm, findUniqueTerm } from '../../../service/admin.service/admin.administration.service/admin.administration.service';
import { FindUniqueTermSchema } from '../../../schema/admin.dto/admin.administartion.dto/admin.administartion.dto';

export const createNewTermHandler = async (req: Request, res: Response, next: NextFunction) => {
    const newterm = await createNewterm();
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
export const deleteTermHandler = async (req: Request<FindUniqueTermSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const deletedTerm = await deleteTerm(id);
    res.status(200).json({ message: 'The Term is deleted', deletedTerm });
};
