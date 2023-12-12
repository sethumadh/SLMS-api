import { z } from 'zod';

/* enroll applicant to subjects */
export const createClassWithSectionsSchema = z.object({
    body: z.object({
        createClassData: z.object({
            termId: z.number(),
            subjectName: z.string(),
            levelName: z.string(),
            sections: z.array(z.string())
        })
    })
});
export type CreateClassWithSectionsSchema = z.infer<typeof createClassWithSectionsSchema>;
