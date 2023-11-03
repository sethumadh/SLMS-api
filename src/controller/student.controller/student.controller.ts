import { NextFunction, Request, Response } from 'express';

import { customError } from '../../utils/customError';
import { NewStudentSchema } from '../../schema/student.dto';
import { createStudent, deleteManyStudents, findAllStudents, findUniqueStudent } from '../../service/student.service';
import { asyncErrorHandler } from '../../utils/asyncErrorHandler';

export const createStudentHandler = asyncErrorHandler(async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const data = req.body;
    const newStudent = await createStudent(data);
    res.status(200).json(newStudent);
});
export const findUniqueStudentHandler = asyncErrorHandler(async (req: Request<{ id: string }, {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const student = await findUniqueStudent(id);
    res.status(200).json(student);
});
export const findAllStudentsHandler = asyncErrorHandler(async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    try {
        const newStudent = await findAllStudents();
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
