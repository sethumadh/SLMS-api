import { NextFunction } from "express";
import { Err } from "../../types/type";

export const globalErrorHandler = (err: Err, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.statusCode >= 400 && err.statusCode < 500 ? 'Fail' : 'server error';

    Error.captureStackTrace(err);
}