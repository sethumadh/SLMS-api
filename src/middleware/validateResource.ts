import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import { customError } from '../utils/customError';
import { error } from 'console';

const validate = (schema: AnyZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    // console.log(req, 'url inside req');
    // console.log(req.query, 'url inside req');
    console.log(req.body);
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (e: any) {
        if (process.env.NODE_ENV === 'development') {
            const error = customError(`Validation error : ${e}`, 'fail', 400, false);
            console.log(e);
            next(error);
        } else {
            const error = customError(`Something went wrong:Validation`, 'fail', 500, false);
            next(error);
        }
    }
};

export default validate;
