import express from 'express';

import { asyncErrorHandler } from '../../utils/asyncErrorHandler';
import validate from '../../middleware/validateResource';


import { findAllStudentSchema, findUniqueStudentSchema, updateStudentPersonalDetailSchema } from '../../schema/admin.dto/admin.dto';
import { findAllStudentsHandler, findStudentByIdHandler, updateStudentPersonalDetailHandler } from '../../controller/admin.controller/student.controller';


const router = express.Router();


router.route('/application/get-all-students').get(validate(findAllStudentSchema), asyncErrorHandler(findAllStudentsHandler));
router.route('/application/student-detail/:id').get(validate(findUniqueStudentSchema), asyncErrorHandler(findStudentByIdHandler));
router.route('/application/student-update-detail/:id').patch(validate(updateStudentPersonalDetailSchema), updateStudentPersonalDetailHandler);

// router.route('/application/deleteAllStudents');
export default router;
// findUniqueStudentSchema
