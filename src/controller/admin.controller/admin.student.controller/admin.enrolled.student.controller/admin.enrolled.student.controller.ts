import { NextFunction, Request, Response } from 'express';

import { customError } from '../../../../utils/customError';
import {
    deleteManyStudents,
    findAllEnrolledStudents,
    findEnrolledStudentById,
    searchEnrolledStudents,
    updateStudentHealthInformation,
    updateStudentParentsDetail,
    updateStudentPersonalDetail
} from '../../../../service/admin.service/admin.student.service/admin.enrolled.student.service/admin.enrolled.student.service';
import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import {
    FindAllEnrolledStudentsSchema,
    FindUniqueStudentSchema,
    SearchEnrolledStudentsSchema,
    UpdateStudentHealthDetailSchema,
    UpdateStudentParentsDetailSchema,
    UpdateStudentPersonalDetailSchema
} from '../../../../schema/admin.dto/admin.student.dto/admin.enrolledstudent/admin.enrolled.student.dto';

// find unqiue student by ID for internal queries
export const findEnrolledStudentByIdHandler = async (req: Request<FindUniqueStudentSchema['params'], {}, {}, {}>, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const student = await findEnrolledStudentById(id);
    res.status(200).json(student);
};

// Find all student for the admin
export const findAllEnrolledStudentsHandler = async (req: Request<{}, {}, {}, FindAllEnrolledStudentsSchema['query']>, res: Response, next: NextFunction) => {
    const { page } = req.query;

    if (page) {
        const allStudent = await findAllEnrolledStudents(+page);
        res.status(200).json(allStudent);
    } else {
        const page = 0;
        const allStudent = await findAllEnrolledStudents(page);
        res.status(200).json(allStudent);
    }
};

export const searchEnrolledStudentsHandler = async (req: Request<{}, {}, {}, SearchEnrolledStudentsSchema['query']>, res: Response, next: NextFunction) => {
    const { search, page = 0 } = req.query;
    const searchResult = await searchEnrolledStudents(search, +page);
    res.status(200).json(searchResult);
};

// update student personal details service
export const updateStudentPersonalDetailHandler = asyncErrorHandler(
    async (req: Request<FindUniqueStudentSchema['params'], {}, UpdateStudentPersonalDetailSchema['body'], {}>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body.personalDetails;
            const updateStudent = await updateStudentPersonalDetail(id, data);
            res.status(200).json(updateStudent);
        } catch (err: any) {
            if (err.message == 'email or contact already exists') {
                const error = customError(`This email or contact you are trying to update already exists in student database`, 'fail', 404, true);
                res.status(400).json({ message: error.message });
            } else {
                const error = customError('Internal server error- something went wrong while updating student personal details', 'fail', 500, true);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
);

// update student parents details service
export const updateStudentParentsDetailHandler = asyncErrorHandler(
    async (req: Request<FindUniqueStudentSchema['params'], {}, UpdateStudentParentsDetailSchema['body'], {}>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body.parentsDetails;
            const updateStudent = await updateStudentParentsDetail(id, data);
            res.status(200).json(updateStudent);
        } catch (err: any) {
            if (err.message == 'student does not exist with given ID') {
                const error = customError('The student you are trying to update is either deleted or does not exist', 'fail', 400, true);
                res.status(400).json({ message: error.message });
            } else {
                const error = customError('Internal server error- something went wrong while updating student parent details', 'fail', 500, true);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
);

// Update Emergency and health Details
export const updateStudentHealthInformationHandler = asyncErrorHandler(
    async (req: Request<FindUniqueStudentSchema['params'], {}, UpdateStudentHealthDetailSchema['body'], {}>, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const updateStudent = await updateStudentHealthInformation(id, data);
            res.status(200).json(updateStudent);
        } catch (err: any) {
            if (err.message == 'student does not exist with given ID') {
                const error = customError('The student you are trying to update is either deleted or does not exist', 'fail', 400, true);
                res.status(400).json({ message: error.message });
            } else {
                const error = customError('Internal server error- something went wrong while updating student parent details', 'fail', 500, true);
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }
);

// delete student
export const deleteManyStudentsHandler = async (req: Request, res: Response, next: NextFunction) => {
    const newStudent = await deleteManyStudents();
    res.status(200).json('deleted all students');
};