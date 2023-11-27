import { z } from 'zod';
import { findAllStudentSchema } from '../admin.student.dto/admin.student.dto';

export const findAllApplicantSchema = findAllStudentSchema;

export const searchApplicantSchema = z.object({
    query: z.object({
        search: z.string().min(1, { message: 'value required for search @ksm' }),
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type SearchApplicantSchema = z.infer<typeof searchApplicantSchema>;
