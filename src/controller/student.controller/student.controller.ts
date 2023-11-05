import { NextFunction, Request, Response } from 'express';

import { customError } from '../../utils/customError';
import { NewStudentSchema, FindAllStudentSchema } from '../../schema/student.dto';
import { createStudent, deleteManyStudents, findAllStudents, findStudentById } from '../../service/student.service';
import { asyncErrorHandler } from '../../utils/asyncErrorHandler';

export const createStudentHandler = asyncErrorHandler(async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const data = req.body;
    const newStudent = await createStudent(data);
    res.status(200).json(newStudent);
});
export const findStudentByIdHandler = asyncErrorHandler(async (req: Request<{ id: string }, {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const student = await findStudentById(id);
    res.status(200).json(student);
});
export const findAllStudentsHandler = asyncErrorHandler(async (req: Request<{}, {}, {}, FindAllStudentSchema['query']>, res: Response, next: NextFunction) => {
    const { page } = req.query;
    try {
        if (page) {
            const allStudent = await findAllStudents(+page);
            res.status(200).json(allStudent);
        } else {
            const page = 0;
            const allStudent = await findAllStudents(page);
            res.status(200).json(allStudent);
        }
    } catch (e) {
        const error = customError('students not found @ ksm ', 'Fail', 400, false);
        next(error);
    }
});

export const deleteManyStudentsHandler = async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const newStudent = await deleteManyStudents();
    res.status(200).json('deleted all students');
};
