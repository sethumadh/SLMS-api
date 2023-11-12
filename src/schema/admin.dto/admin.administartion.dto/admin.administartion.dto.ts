import { z } from 'zod';

export const findUniqueTermSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindUniqueTermSchema = z.infer<typeof findUniqueTermSchema>;