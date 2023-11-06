import { z } from 'zod';
import { EmergencyContactSchema, HealthInformationSchema, OtherInformationSchema, ParentsSchema } from '../newStudent.dto/newStudent.dto';

// To find a student by ID
export const findUniqueStudentSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindUniqueStudentSchema = z.infer<typeof findUniqueStudentSchema>;

//To find all students for Admin
export const findAllStudentSchema = z.object({
    query: z.object({
        page: z.string().min(1, { message: 'Atleast one param string value required @ksm' }).optional()
    })
});
export type FindAllStudentSchema = z.infer<typeof findAllStudentSchema>;

// update STUDENT DETAILS at the admin level - Custom schemas
export const AdminPersonalSchema = z.object({
    id: z.number(),
    role: z.string(),
    firstName: z.string({ required_error: 'First name is required' }).min(3, { message: 'Name should be minimum 3 Characters' }),
    lastName: z.string({ required_error: 'Last name is required' }).min(3, { message: 'Last Name should be minimum 3 Characters' }),
    // DOB: z.date({ required_error: 'Please select a date ' }).min(new Date('2005-01-01'), { message: 'Age cannot be more than 18' }).max(new Date('2013-01-01'), { message: 'Age should be more 10' }).optional(),
    DOB: z.string(),
    gender: z.string({ required_error: 'Gender is required' }).min(1, { message: 'Enter gender' }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
    contact: z.string({ required_error: 'Mobile number is required' }).regex(/^0\d{9}$/, 'Please provide a valid Number!'),
    address: z.string({ required_error: 'Address is required' }).min(3, { message: 'minium 3 characters required' }),
    suburb: z.string({ required_error: 'suburn is required' }).min(3, { message: 'minium 3 characters required' }),
    state: z.string({ required_error: 'State is required' }),
    country: z.string({ required_error: 'State is required' }),
    postcode: z.string({ required_error: 'Post code is required' }).min(4, { message: 'Post code is minimum 4 digits' }).max(4, { message: 'Post code is maximum 4 digits' }),
    image: z.string({}).optional()
});
export const AdminSubjectSchema = z.object({
    id: z.string().optional(),
    subjects: z
        .array(
            z.object({
                id: z.string().optional(),
                subjectName: z.string()
            })
        )
        .refine((subjects) => subjects.length > 0, {
            message: 'You have to select atleats one subject'
        }),
    subjectRelated: z
        .array(
            z.object({
                id: z.string().optional(),
                subjectRelated: z.string()
            })
        )
        .refine((subjectRelated) => subjectRelated.length > 0, {
            message: 'You have to select atleast one Option'
        })
});
export const FeedbackSchema = z
    .array(
        z
            .object({
                id: z.string().optional(),
                feedback: z.string().optional()
            })
            .optional()
    )
    .optional();
// //To update student PERSONAL details at the admin level
export const updateStudentPersonalDetailSchema = z.object({
    body: z.object(
        {
            personalDetails: AdminPersonalSchema
        },
        { required_error: 'Some or all of Student data is missing which are required is required' }
    ),
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});

export type UpdateStudentPersonalDetailSchema = z.infer<typeof updateStudentPersonalDetailSchema>;
