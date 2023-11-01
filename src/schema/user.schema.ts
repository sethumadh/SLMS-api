import { z } from 'zod';

export const userSchema = z.object({
    body: z.object(
        {
            name: z.string()
        },
        { required_error: 'Name is required' }
    )
});
export type UserSchema =  z.infer<typeof userSchema>