import { z } from 'zod';
import { findAllStudentSchema, findUniqueStudentSchema } from '../admin.student.dto/admin.student.dto';

export const findAllApplicantSchema = findAllStudentSchema;

export const searchApplicantSchema = z.object({
    query: z.object({
        search: z.string().min(1, { message: 'value required for search @ksm' }),
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type SearchApplicantSchema = z.infer<typeof searchApplicantSchema>;

export const findUniqueApplicantSchema = findUniqueStudentSchema;

export type FindUniqueApplicantSchema = z.infer<typeof findUniqueApplicantSchema>;

/* enroll applicant to subjects */
export const applicantEnrollDataSchema = z.object({
    body: z.object({
        applicantId: z.number(),
        enrollData: z.array(
            z.object({
                subject: z.string(),
                termSubjectGroupId: z.number(),
                subjectGroupId: z.number(),
                termId: z.number(),
                feeId: z.number(),
                termSubjectId: z.number()
            })
        )
    })
});
export type ApplicantEnrollDataSchema = z.infer<typeof applicantEnrollDataSchema>;
