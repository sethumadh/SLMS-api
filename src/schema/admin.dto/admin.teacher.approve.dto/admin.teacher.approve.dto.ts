import { z } from "zod";

//To find all enrolled students for Admin
export const findAllTeacherApplicationsSchema = z.object({
    query: z.object({
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional(),
        termId: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional(),
    })
});
export type FindAllTeacherApplicationsSchema  = z.infer<typeof findAllTeacherApplicationsSchema>;

/*search applicants*/
export const searchTeacherApplicantSchema = z.object({
    query: z.object({
        search: z.string().min(1, { message: 'value required for search @ksm' }),
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type SearchTeacherApplicantSchema = z.infer<typeof searchTeacherApplicantSchema>;

/*find appicant by id*/
export const findUniqueTeacherApplicantSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});

export type FindUniqueTeacherApplicantSchema = z.infer<typeof findUniqueTeacherApplicantSchema>;
