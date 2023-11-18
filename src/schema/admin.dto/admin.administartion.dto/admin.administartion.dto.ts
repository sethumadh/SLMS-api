import { z } from 'zod';

export const findUniqueTermSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindUniqueTermSchema = z.infer<typeof findUniqueTermSchema>;

export const createTermSchema = z.object({
    body: z.object({
        name: z.string(),
        startDate: z.string(),
        endDate: z.string()
    })
});
export type CreateTermSchema = z.infer<typeof createTermSchema>;

export const createNewTermSetupSchema = z.object({
    body: z.object({
        termName: z.string(),
        subjects: z.array(
            z.object({
                subject: z.string(),
                fee: z.number(),
                feeInterval: z.string(),
                levels: z.array(z.string())
            })
        )
    })
});
export type CreateNewTermSetupSchema = z.infer<typeof createNewTermSetupSchema>;

const levelSchema = z.object({
    id: z.number(),
    name: z.string()
});

const subjectLevelSchema = z.object({
    level: levelSchema
});

const feeSchema = z.object({
    id: z.number(),
    amount: z.number(),
    subjectId: z.number(),
    paymentType: z.enum(['MONTHLY', 'TERM'])
});

const subjectSchema = z.object({
    name: z.string(),
    fee: feeSchema,
    isActive: z.boolean(),
    id: z.number(),
    SubjectLevel: z.array(subjectLevelSchema)
});

const termSubjectSchema = z.object({
    subject: subjectSchema
});

const termSchema = z.object({
    id: z.number(),
    name: z.string(),
    currentTerm: z.boolean(),
    startDate: z.string(), // or use z.date() if you want to validate actual Date objects
    endDate: z.string(), // or use z.date()
    createdAt: z.string(), // or use z.date()
    updatedAt: z.string(), // or use z.date()
    TermSubject: z.array(termSubjectSchema)
});
export type TermSchema = z.infer<typeof termSchema>;

export const changeCurrentTermNameSchema = z.object({
    body: z.object({
        updatedTerm: termSchema
    }),
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type ChangeCurrentTermNameSchema = z.infer<typeof changeCurrentTermNameSchema>;

export const extendCurrentTermSchema = z.object({
    body: z.object({
        updatedTerm: termSchema
    }),
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type ExtendCurrentTermSchema = z.infer<typeof extendCurrentTermSchema>;
