import { NextFunction, Request, Response } from 'express';

import { customError } from '../../utils/customError';
import { NewStudentSchema } from '../../schema/student.schema';
import { createStudent, deleteManyStudents, findStudents } from '../../service/student.service';
import { asyncErrorHandler } from '../../utils/asyncErrorHandler';

export const createStudentHandler = asyncErrorHandler(async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const data = req.body;
    const newStudent = await createStudent(data);
    res.status(200).json(newStudent);
});
export const findStudentsHandler = asyncErrorHandler(async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    try {
        const newStudent = await findStudents();
        res.status(200).json(newStudent);
    } catch (e) {
        const error = customError('students not found', 'Fail', 400, false);
        next(error);
    }
});
export const deleteManyStudentsHandler = async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const newStudent = await deleteManyStudents();
    res.status(200).json('deleted all students');
};
