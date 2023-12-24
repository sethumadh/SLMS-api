import { NextFunction, Request, Response } from 'express';

import { customError } from '../../../../utils/customError';
import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import { findActiveStudents } from '../../../../service/admin.service/admin.student.service/admin.active.student.service/admin.active.student.service';
import { FindAllActiveStudentsSchema } from '../../../../schema/admin.dto/admin.student.dto/admin.active.students.dto/admin.active.students.dto';

// Find all students for the admin
export const findActiveStudentsHandler = async (req: Request<{}, {}, {}, FindAllActiveStudentsSchema['query']>, res: Response, next: NextFunction) => {
    const { page } = req.query;

    if (page) {
        const allStudent = await findActiveStudents(+page);
        res.status(200).json(allStudent);
    } else {
        const page = 0;
        const allStudent = await findActiveStudents(page);
        res.status(200).json(allStudent);
    }
};