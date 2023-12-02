// import { UpdateStudentDetailSchema } from '../schema/admin.dto/admin.dto';
import { z } from 'zod';

import { UpdateStudentHealthDetailSchema, UpdateStudentParentsDetailSchema, UpdateStudentPersonalDetailSchema } from '../../../schema/admin.dto/admin.student.dto/admin.student.dto';
import { db } from '../../../utils/db.server';
import { customError } from '../../../utils/customError';

// findAllStudents()--
// createStudent(data)--
// findStudentById('1')--

// findByEmail('en@example.com');
// filterStudentsBySubjects(['Science', 'Math']);?
// findStudentByEmail('b@b.com');?
// findStudentsBySearch('e');?
// findUniqueStudent('1')?
// findFeedbackByStudentId('1')?
// createStudentFeedback('feedback for student 3', '3')?
// findSiblingsByParentEmail('b@b.com');

//  find feedback for a student for admin and teacher
// export async function findFeedbackByStudentId(id: string, page: number) {
//     const take = 5;
//     // const page = 2; // coming from request
//     const pageNum: number = page ?? 0;
//     const skip = pageNum * take;
//     const students = await db.feedback.findMany({
//         skip,
//         take,
//         where: {
//             Student: {
//                 is: {
//                     id: +id
//                 }
//             }
//         }
//     });
//     console.log(students);
// }

// filter students using subjetcs --> drop down at the student table
export async function filterStudentsBySubjects(subjects: string[], page: number) {
    const take = 5;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const students = await db.student.findMany({
        skip,
        take,
        where: {
            // subjects: {
            //     subjects: {
            //         some: {
            //             subjectName: {
            //                 in: subjects
            //             }
            //         }
            //     }
            // }
        }
    });
    console.log(students);
}

// find student using general search  for search fnction in student table
export async function findStudentsBySearch(search: string, page: number) {
    const take = 2;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const students = await db.student.findMany({
        skip,
        take,
        where: {
            OR: [
                {
                    personalDetails: {
                        OR: [
                            { firstName: { contains: search, mode: 'insensitive' } },
                            { lastName: { contains: search, mode: 'insensitive' } },
                            { email: { contains: search, mode: 'insensitive' } },
                            { contact: { contains: search, mode: 'insensitive' } },
                            { postcode: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                },
                {
                    parentsDetails: {
                        OR: [
                            { fatherName: { contains: search, mode: 'insensitive' } },
                            { motherName: { contains: search, mode: 'insensitive' } },
                            { parentEmail: { contains: search, mode: 'insensitive' } },
                            { parentContact: { contains: search, mode: 'insensitive' } }
                        ]
                    }
                }
            ]
        }
    });
    console.log(students);
}

// find unqiue student by ID for internal queries
export async function findStudentById(id: string) {
    const student = await db.student.findUnique({
        where: {
            id: +id
        },
        include: {
            personalDetails: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    DOB: true,
                    gender: true,
                    email: true,
                    contact: true,
                    address: true,
                    suburb: true,
                    state: true,
                    country: true,
                    postcode: true,
                    image: true
                }
            },
            parentsDetails: {
                select: {
                    id: true,
                    fatherName: true,
                    motherName: true,
                    parentEmail: true,
                    parentContact: true
                }
            },
            emergencyContact: {
                select: {
                    id: true,
                    contactPerson: true,
                    contactNumber: true,
                    relationship: true
                }
            },
            healthInformation: {
                select: {
                    id: true,
                    medicareNumber: true,
                    ambulanceMembershipNumber: true,
                    medicalCondition: true,
                    allergy: true
                }
            },
            otherInformation: {
                select: {
                    id: true,
                    otherInfo: true,
                    declaration: true
                }
            }

            // feedback: {
            //     select: {
            //         id: true,
            //         feedback: true
            //     }
            // }
        }
    });

    return student;
}

// Find all student for the admin
export async function findAllStudents(page: number) {
    const take = 5;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const students = await db.student.findMany({
        where: {
            role: 'STUDENT'
        },
        skip,
        take,
        select: {
            id: true,
            role: true,
            personalDetails: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    DOB: true,
                    gender: true,
                    email: true,
                    contact: true,
                    address: true,
                    suburb: true,
                    state: true,
                    country: true,
                    postcode: true,
                    image: true
                }
            },
            parentsDetails: {
                select: {
                    id: true,
                    fatherName: true,
                    motherName: true,
                    parentEmail: true,
                    parentContact: true
                }
            },
            emergencyContact: {
                select: {
                    id: true,
                    contactPerson: true,
                    contactNumber: true,
                    relationship: true
                }
            },
            healthInformation: {
                select: {
                    id: true,
                    medicareNumber: true,
                    ambulanceMembershipNumber: true,
                    medicalCondition: true,
                    allergy: true
                }
            },
            subjectRelated: true,
            subjectsChosen: true,
            otherInformation: {
                select: {
                    id: true,
                    otherInfo: true,
                    declaration: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    const count = students.length;
    if (students.length == 0) {
        throw customError(`No students lists to show`, 'fail', 400, true);
    }

    return { students, count };
}

// delete student
export async function deleteManyStudents() {
    const student = await db.student.deleteMany();
}

// deleteManyStudents();

// Find siblings of a student using parent email

export async function findSiblingsByParentEmail(email: string) {
    try {
        const siblings = await db.student.findMany({
            where: {
                OR: [
                    {
                        parentsDetails: {
                            parentEmail: email
                        }
                    },
                    {
                        personalDetails: {
                            email: email
                        }
                    }
                ]
            }
        });

        console.log(siblings);
        let siblingsDetails: any = [];
        for (let sibling of siblings) {
            const data = await findStudentById(sibling.id.toString());
            siblingsDetails = [...siblingsDetails, data];
        }
        console.log('details:', siblingsDetails);
    } catch (e) {
        console.log(e);
        return new Error(`cannot find sibling data @ksm ${e}`);
    }
}

// update student personal details service
export async function updateStudentPersonalDetail(id: string, data: UpdateStudentPersonalDetailSchema['body']['personalDetails']) {
    const RoleEnum = z.enum(['ADMIN', 'TEACHER', 'STUDENT', 'ALUMNI']);
    type RoleEnum = z.infer<typeof RoleEnum>;
    const roleResult = RoleEnum.safeParse(data.role);
    if (!RoleEnum.safeParse(data.role).success) {
        throw new Error('Invalid role value');
    }

    const { firstName, role, lastName, DOB, gender, email, contact, address, suburb, state, country, postcode, image } = data;
    const existingStudent = await db.personalDetails.findFirst({
        where: {
            OR: [{ email }, { contact }]
        }
    });
    console.log(existingStudent);

    /***********************************************************/
    /***********************************************************/
    try {
        const updateStudent = await db.student.update({
            where: {
                id: +id
            },
            data: {
                personalDetails: {
                    update: {
                        firstName,
                        lastName,
                        DOB,
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
                role: role as RoleEnum
            }
        });
        return updateStudent;
    } catch (e) {
        throw new Error(`Failed to update student personal details @ksm${e}`);
    }
}

// update student parents details service
export async function updateStudentParentsDetail(id: string, data: UpdateStudentParentsDetailSchema['body']['parentsDetails']) {
    const { parentContact, parentEmail } = data;
    try {
        const updateStudent = await db.student.update({
            where: {
                id: +id
            },
            data: {
                parentsDetails: {
                    update: {
                        parentContact,
                        parentEmail
                    }
                }
            }
        });
        if (!updateStudent) throw new Error('student does not exist with given ID');
        return updateStudent;
    } catch (e) {
        throw new Error(`Failed to update student parents details @ksm${e}`);
    }
}

// Update Emergency and health Details
export async function updateStudentHealthInformation(id: string, data: UpdateStudentHealthDetailSchema['body']) {
    const { contactNumber, contactPerson, relationship } = data.emergencyContact;
    const { allergy, medicalCondition, medicareNumber, ambulanceMembershipNumber } = data.healthInformation;
    const existingStudent = await db.healthInformation.findFirst({
        where: {
            OR: [{ medicareNumber }]
        }
    });
    if (existingStudent?.id != +id) {
        throw new Error(`Medicare already exists already exists`);
    }
    try {
        const updateStudent = await db.student.update({
            where: {
                id: +id
            },
            data: {
                healthInformation: {
                    update: { allergy, medicalCondition, medicareNumber, ambulanceMembershipNumber }
                },
                emergencyContact: {
                    update: {
                        contactNumber,
                        contactPerson,
                        relationship
                    }
                }
            }
        });
        if (!updateStudent) throw new Error('student does not exist with given ID');
        return updateStudent;
    } catch (e) {
        throw new Error(`Failed to update student health and emergency details @ksm${e}`);
    }
}
