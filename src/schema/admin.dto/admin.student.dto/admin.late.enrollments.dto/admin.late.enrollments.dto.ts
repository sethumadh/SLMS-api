import { z } from 'zod';

export const findUniqueLateEnrolledStudentSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindUniqueLateEnrolledStudentSchema = z.infer<typeof findUniqueLateEnrolledStudentSchema>;

export const lateEnrolledActiveStudentSchema = z.object({
    query: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' }),
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type LateEnrolledActiveStudentSchema = z.infer<typeof lateEnrolledActiveStudentSchema>;
export const findLateEnrolledStudentSubjectsSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' }),
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindLateEnrolledStudentSubjectsSchema = z.infer<typeof findLateEnrolledStudentSubjectsSchema>;

//To find all enrolled students for Admin
export const findAllLateEnrolledStudentsSchema = z.object({
    query: z.object({
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional(),
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type FindAllLateEnrolledStudentsSchema = z.infer<typeof findAllLateEnrolledStudentsSchema>;

// search enrolled students
export const searchlateEnrolledStudentsSchema = z.object({
    query: z.object({
        search: z.string(),
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional(),
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type SearchLateEnrolledStudentsSchema = z.infer<typeof searchlateEnrolledStudentsSchema>;

/* enroll lateEnrolledStudent to subjects */
export const enrolledStudentEnrollDataSchema = z.object({
    body: z.object({
        lateEnrolledStudentId: z.number(),
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
export type EnrolledStudentEnrollDataSchema = z.infer<typeof enrolledStudentEnrollDataSchema>;
