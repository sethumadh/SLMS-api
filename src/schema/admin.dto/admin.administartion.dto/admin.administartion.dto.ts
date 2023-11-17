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

export const changeCurrentTermNameSchema = z.object({
    body: z.object({
        name: z.string()
    }),
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type ChangeCurrentTermNameSchema = z.infer<typeof changeCurrentTermNameSchema>;

export const extendCurrentTermSchema = z.object({
    body: z.object({
        date: z.string()
    }),
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type ExtendCurrentTermSchema = z.infer<typeof extendCurrentTermSchema>;
