import { NextFunction, Request, Response } from 'express';

import { customError } from '../../utils/customError';
import { NewStudentSchema } from '../../schema/newStudent.dto/newStudent.dto';
import { createStudent, deleteManyStudents, findAllStudents, findStudentById, updateStudentPersonalDetail } from '../../service/admin.service/student.service';
import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import { FindAllStudentSchema, FindUniqueStudentSchema, UpdateStudentPersonalDetailSchema } from '../../schema/admin.dto/admin.dto';

export const createStudentHandler = async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const data = req.body;
    const newStudent = await createStudent(data);
    res.status(200).json(newStudent);
};
export const findStudentByIdHandler = async (req: Request<FindUniqueStudentSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const student = await findStudentById(id);
    res.status(200).json(student);
};
export const findAllStudentsHandler = async (req: Request<{}, {}, {}, FindAllStudentSchema['query']>, res: Response, next: NextFunction) => {
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
        const error = customError(`students not found @ ksm${e}`, 'Fail', 400, false);
        next(error);
    }
};

export const updateStudentPersonalDetailHandler = asyncErrorHandler(
    async (req: Request<FindUniqueStudentSchema['params'], {}, UpdateStudentPersonalDetailSchema['body'], {}>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body.personalDetails;
            const updateStudent = await updateStudentPersonalDetail(id, data);
            res.status(200).json(updateStudent);
        } catch (err: any) {
            console.log('Error from service:-->>', err.message);
            if (err.message == 'email or contact already exists') {
                const error = customError(`This email or contact you are trying to update already exists in student database`, 'fail', 404, true);
                res.status(400).json({ message: error.message });
            } else {
                const error = customError('Internal server error', 'fail', 500, true);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
);

export const deleteManyStudentsHandler = async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const newStudent = await deleteManyStudents();
    res.status(200).json('deleted all students');
};
