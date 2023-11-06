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
