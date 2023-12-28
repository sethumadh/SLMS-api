import { NextFunction, Request, Response } from 'express';

import { findActiveStudentById, findActiveStudents, searchActiveStudents } from '../../../../service/admin.service/admin.student.service/admin.active.student.service/admin.active.student.service';
import {
    FindAllActiveStudentsSchema,
    FindUniqueActiveStudentSchema,
    SearchActiveStudentsSchema
} from '../../../../schema/admin.dto/admin.student.dto/admin.active.students.dto/admin.active.students.dto';

// Find all students for the admin
export const findActiveStudentsHandler = async (req: Request<{}, {}, {}, FindAllActiveStudentsSchema['query']>, res: Response, next: NextFunction) => {
    const { page, termId } = req.query;

    if (page && termId) {
        const allStudent = await findActiveStudents(+page, +termId);
        res.status(200).json(allStudent);
    } else if (termId) {
        const page = 0;
        const allStudent = await findActiveStudents(page, +termId);
        res.status(200).json(allStudent);
    }
};

export const searchActiveStudentsHandler = async (req: Request<{}, {}, {}, SearchActiveStudentsSchema['query']>, res: Response, next: NextFunction) => {
    const { search, page = 0, termId } = req.query;
    if (termId) {
        const searchResult = await searchActiveStudents(search, +page, +termId);
        res.status(200).json(searchResult);
    }
};

export const findActiveStudentByIdHandler = async (req: Request<FindUniqueActiveStudentSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const student = await findActiveStudentById(id);
    res.status(200).json(student);
};
