import { z } from 'zod';

// To find a student by ID
export const findUniqueActiveStudentSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindUniqueActiveStudentSchema = z.infer<typeof findUniqueActiveStudentSchema>;

//To find all enrolled students for Admin
export const findAllActiveStudentsSchema = z.object({
    query: z.object({
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional(),
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type FindAllActiveStudentsSchema = z.infer<typeof findAllActiveStudentsSchema>;
export const findStudentFeeDetailsSchema = z.object({
    params: z.object({
        studentId: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    }),
    query: z.object({
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindStudentFeeDetailsSchemaSchema = z.infer<typeof findStudentFeeDetailsSchema>;

// search enrolled students
export const searchActiveStudentsSchema = z.object({
    query: z.object({
        search: z.string().optional(),
        subjectOption: z.string().optional(),
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional(),
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type SearchActiveStudentsSchema = z.infer<typeof searchActiveStudentsSchema>;

/* enroll enrolledStudent to subjects */
export const enrolledStudentEnrollDataSchema = z.object({
    body: z.object({
        enrolledStudentId: z.number(),
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
export type ActiveStudentEnrollDataSchema = z.infer<typeof enrolledStudentEnrollDataSchema>;
export const findTermSubjectGroupIdEnrolledSubjectsSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    }),
    query: z.object({
        termSubjectGroupId: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindTermSubjectGroupIdEnrolledSubjectsSchema = z.infer<typeof findTermSubjectGroupIdEnrolledSubjectsSchema>;
