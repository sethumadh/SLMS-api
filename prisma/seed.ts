import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

import { z } from 'zod';

export const PersonalSchema = z.object({
    id: z.number().optional(),
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

export const ParentsSchema = z.object({
    id: z.number().optional(),
    fatherName: z.string({ required_error: "Father's Name is required" }).min(3, { message: 'Minimum 3 characters' }),
    motherName: z.string({ required_error: "Mother's Name is required" }).min(3, { message: 'Minimum 3 characters' }),
    parentEmail: z.string({ required_error: "Parent's Email is required" }).email({ message: 'Invalid email address' }),
    parentContact: z.string({ required_error: "Parent'sMobile number is required" }).regex(/^0\d{9}$/, 'Please provide a valid Number!')
});

export const EmergencyContactSchema = z.object({
    id: z.number().optional(),
    contactPerson: z.string({ required_error: "Contact person's name is required" }).min(3, { message: 'Minimum 3 characters' }),
    contactNumber: z.string({ required_error: "Contact person's Mobile number is required" }).regex(/^0\d{9}$/, 'Please provide a valid Number!'),
    relationship: z.string({ required_error: 'Relationship with children is required' }).min(3, { message: 'Minimum 3 characters' })
});
export const HealthInformationSchema = z.object({
    id: z.number().optional(),
    medicareNumber: z.string().optional(),
    ambulanceMembershipNumber: z.string().optional(),
    medicalCondition: z.string({ required_error: 'Please give a valid answer' }).min(3, { message: 'Mininum 3 characters' }),
    allergy: z.string({ required_error: 'valid' }).min(3, { message: 'Mininum 3 characters' })
});

export const SubjectInterest = z.object({
    id: z.number().optional(),
    subjectsChosen: z.array(z.string()).refine((subjects) => subjects.length > 0, {
        message: 'Please select at least one subject'
    }),
    subjectRelated: z.array(z.string()).refine((subjectRelated) => subjectRelated.length > 0, {
        message: 'Please select at least one option'
    })
});

export const OtherInformationSchema = z.object({
    id: z.number().optional(),
    otherInfo: z.string().optional(),
    declaration: z.array(z.string()).refine((subjectRelated) => subjectRelated.length > 0, {
        message: 'Please give your declaration'
    })
});

// To create a new student at the application level
export const newApplicantSchema = z.object({
    body: z.object(
        {
            personalDetails: PersonalSchema,
            parentsDetails: ParentsSchema,
            emergencyContact: EmergencyContactSchema,
            healthInformation: HealthInformationSchema,
            subjectInterest: SubjectInterest,
            otherInformation: OtherInformationSchema
        },
        { required_error: 'Some or all of Student data is missing which are required is required' }
    )
});
export type NewApplicantSchema = z.infer<typeof newApplicantSchema>;
const studentSeedData: NewApplicantSchema['body'][] = [];
for (let i = 1; i <= 10; i++) {
    studentSeedData.push({
        personalDetails: {
            firstName: `Name${i}`,
            lastName: `Lopez${i}`,
            DOB: `200${6 + i}-09-03`,
            gender: i % 2 === 0 ? 'male' : 'female',
            email: `emil${i}@domain.com`,
            contact: `03990345${63 + i}`,
            address: `789 Elm Avenue, Apt ${i}`,
            suburb: `Suburb${i}`,
            state: 'California',
            country: 'USA',
            postcode: `124${i}`,
            image: ''
        },
        parentsDetails: {
            fatherName: `Father${i}`,
            motherName: `Mother${i}`,
            parentEmail: `parent${i}@example.com`,
            parentContact: `01234${560 + i}`
        },
        emergencyContact: {
            contactPerson: `Contact${i}`,
            contactNumber: `00112233${50 + i}`,
            relationship: 'cousin'
        },
        healthInformation: {
            medicareNumber: `3680${320 + i}23`,
            ambulanceMembershipNumber: `${1111 + i}`,
            medicalCondition: 'None',
            allergy: 'None'
        },
        subjectInterest: {
            subjectsChosen: ['Math', 'English'],
            subjectRelated: ['option-1', 'option-2']
        },
        otherInformation: {
            otherInfo: `Info ${i}`,
            declaration: ["I pledge to follow the school's rules."]
        }
    });
}

async function seedStudents() {
    console.log('Start seeding students...');

    for (const student of studentSeedData) {
        const {
            emergencyContact: { contactNumber, contactPerson, relationship },
            healthInformation: { allergy, medicalCondition, medicareNumber, ambulanceMembershipNumber },
            otherInformation: { declaration, otherInfo },
            parentsDetails: { fatherName, motherName, parentContact, parentEmail },
            personalDetails: { email, address, contact, country, firstName, gender, lastName, postcode, state, suburb, DOB, image },
            subjectInterest: { subjectRelated, subjectsChosen }
        } = student;
        const studentsCreated = await prisma.student.create({
            data: {
                personalDetails: {
                    create: {
                        firstName,
                        lastName,
                        DOB: new Date(DOB),
                        gender,
                        email,
                        contact,
                        address,
                        suburb,
                        state,
                        country,
                        postcode,
                        image
                    }
                },
                parentsDetails: {
                    create: {
                        fatherName,
                        motherName,
                        parentContact,
                        parentEmail
                    }
                },
                emergencyContact: {
                    create: {
                        contactPerson,
                        contactNumber,
                        relationship
                    }
                },
                healthInformation: {
                    create: {
                        medicareNumber: medicareNumber ? medicareNumber : 'No Medicare Number provided',
                        ambulanceMembershipNumber,
                        medicalCondition,
                        allergy
                    }
                },
                subjectsChosen,
                subjectRelated,
                otherInformation: {
                    create: {
                        otherInfo: otherInfo ? otherInfo : 'No information provided',
                        declaration
                    }
                }
            }
        });
        //   console.log(`Created student with id: ${student.id}`);
    }
    console.log('Seeding finished.');
}

seedStudents()
    .catch(async (error) => {
        console.error('Error seeding students:', error);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
