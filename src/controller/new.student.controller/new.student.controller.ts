import { NextFunction, Request, Response } from 'express';

import { customError } from '../../utils/customError';
import { NewStudentSchema } from '../../schema/new.student.dto/new.student.dto';

import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import { FindAllStudentSchema, FindUniqueStudentSchema, UpdateStudentPersonalDetailSchema } from '../../schema/admin.dto/admin.student.dto/admin.student.dto';
import { createStudent } from '../../service/new.student.service/new.student.service';

export const createStudentHandler = async (req: Request<{}, {}, NewStudentSchema['body'], {}>, res: Response, next: NextFunction) => {
    const data = req.body;
    const newStudent = await createStudent(data);
    res.status(200).json(newStudent);
};
