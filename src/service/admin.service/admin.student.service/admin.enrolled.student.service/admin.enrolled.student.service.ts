// import { UpdateStudentDetailSchema } from '../schema/admin.dto/admin.dto';
import { z } from 'zod';

import {
    EnrolledStudentEnrollDataSchema,
    UpdateStudentHealthDetailSchema,
    UpdateStudentParentsDetailSchema,
    UpdateStudentPersonalDetailSchema
} from '../../../../schema/admin.dto/admin.student.dto/admin.enrolledstudent/admin.enrolled.student.dto';
import { db } from '../../../../utils/db.server';
import { customError } from '../../../../utils/customError';

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

// Find all student for the admin

export async function findAllEnrolledStudents(page: number) {
    const take = 5;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const enrolledStudents = await db.student.findMany({
        where: {
            role: 'STUDENT',
            isActive: false
        },
        skip,
        take,
        select: {
            id: true,
            role: true,
            isActive: true,
            updatedAt: true,
            createdAt: true,
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
            createdAt: 'desc'
        }
    });
    const count = await db.student.aggregate({
        where: {
            role: 'STUDENT'
        },
        _count: {
            id: true
        }
    });

    if (enrolledStudents.length == 0) {
        throw customError(`No students lists to show`, 'fail', 400, true);
    }
    return { enrolledStudents, count };
}

// find unqiue student by ID for internal queries
export async function findEnrolledStudentById(id: string) {
    const enrolledStudent = await db.student.findUnique({
        where: {
            id: +id,
            role: 'STUDENT',
            isActive: false
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
        }
    });

    return enrolledStudent;
}
// find term to enroll for the subject and classes management
export async function findTermToEnrollForStudentEnrolled() {
    const publishTerm = await db.term.findFirst({
        where: {
            isPublish: true
        },
        select: {
            id: true,
            name: true,
            isPublish: true,
            currentTerm: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            updatedAt: true,
            termSubject: {
                select: {
                    id: true,
                    subject: true,
                    termSubjectGroup: true
                }
            }
        }
    });

    if (!publishTerm) {
        throw customError(`Pubslished Term could not found. Please try again later`, 'fail', 404, true);
    }

    return publishTerm;
}
export async function findEnrolledStudentEnrolledSubjects(id: string) {
    // Fetch all enrollments for the student
    const enrollments = await db.enrollment.findMany({
        where: { studentId: parseInt(id) },
        include: {
            subjectEnrollment: {
                include: {
                    termSubject: {
                        include: {
                            subject: true
                        }
                    }
                }
            }
        }
    });

    // Extract the subjects from the enrollments
    let enrolledSubjects: { subjectId: number; subjectName: string }[] = [];
    enrollments.forEach((enrollment) => {
        if (enrollment.subjectEnrollment) { // Check if subjectEnrollment exists
            const se = enrollment.subjectEnrollment;
            enrolledSubjects.push({
                subjectId: se.termSubject.subjectId,
                subjectName: se.termSubject.subject.name
                // Include additional subject details as needed
            });
        }
    });

    // Return the list of enrolled subjects
    return enrolledSubjects;
}
// search enrolled student for the admin
export async function searchEnrolledStudents(search: string, page: number) {
    const take = 10;
    if (search.length == 0) {
        throw customError(`No Search query string available`, 'fail', 400, true);
    }
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const enrolledStudents = await db.student.findMany({
        skip,
        take,
        where: {
            role: 'STUDENT',
            isActive: false,
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
        },
        select: {
            id: true,
            role: true,
            isActive: true,
            updatedAt: true,
            createdAt: true,
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
            createdAt: 'desc'
        }
    });
    const count = await db.student.aggregate({
        where: {
            role: 'STUDENT',
            isActive: false,
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
        },
        _count: {
            id: true
        }
    });

    if (enrolledStudents.length == 0) {
        throw customError(`No students lists to show`, 'fail', 400, true);
    }
    return { enrolledStudents, count };
}
// delete student
export async function deleteManyStudents() {
    const student = await db.student.deleteMany();
}
/* enroll applicant to subjects */
export async function enrollStudentEnrolledToSubjects(enrollData: EnrolledStudentEnrollDataSchema['body']) {

    let alreadyEnrolledSubjects = [];

    // Check Existing Enrollments
    for (const enrollmentItem of enrollData.enrollData) {
        const existingEnrollments = await db.enrollment.findMany({
            where: { studentId: enrollData.enrolledStudentId, termSubjectGroupId: enrollmentItem.termSubjectGroupId },
            include: { subjectEnrollment: { include: { termSubject: true } } }
        });

        for (const enrollment of existingEnrollments) {
            // Directly check the subjectEnrollment object
            if (enrollment.subjectEnrollment && enrollment.subjectEnrollment.termSubjectId === enrollmentItem.termSubjectId) {
                alreadyEnrolledSubjects.push(enrollmentItem.subject);
            }
        }
    }

    if (alreadyEnrolledSubjects.length > 0) {
        throw new Error(`Already enrolled in subjects: ${alreadyEnrolledSubjects.join(', ')}`);
    }

    let enrollmentIds = [];
    for (const enrollmentItem of enrollData.enrollData) {
        // Fetch fee info
        const feeInfo = await db.termSubjectGroup.findUnique({
            where: { id: enrollmentItem.termSubjectGroupId },
            include: { fee: true, term: true }
        });

        // Determine due date
        let dueDate;
        if (feeInfo?.fee?.paymentType === 'MONTHLY') {
            const now = new Date();
            dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            dueDate.setDate(dueDate.getDate() - 5);
        } else if (feeInfo?.fee?.paymentType === 'TERM') {
            const termStartDate = new Date(feeInfo.term.startDate);
            dueDate = new Date(termStartDate.setMonth(termStartDate.getMonth() + 2));
        } else {
            dueDate = new Date();
        }

        // Create Enrollment and SubjectEnrollment
        const newEnrollment = await db.enrollment.create({
            data: {
                studentId: enrollData.enrolledStudentId,
                termSubjectGroupId: enrollmentItem.termSubjectGroupId,
                dueDate: dueDate,
                subjectEnrollment: { create: { termSubjectId: enrollmentItem.termSubjectId } }
            },
            select: { id: true }
        });

        // Handle FeePayment and StudentTermFee
        if (feeInfo?.feeId) {
            const studentTermFee = await db.studentTermFee.upsert({
                where: {
                    studentId_termSubjectGroupId_termId: {
                        studentId: enrollData.enrolledStudentId,
                        termSubjectGroupId: enrollmentItem.termSubjectGroupId,
                        termId: feeInfo.termId
                    }
                },
                update: {},
                create: {
                    studentId: enrollData.enrolledStudentId,
                    termSubjectGroupId: enrollmentItem.termSubjectGroupId,
                    termId: feeInfo.termId
                }
            });

            await db.feePayment.create({
                data: {
                    feeId: feeInfo.feeId,
                    studentTermFeeId: studentTermFee.id,
                    dueDate: dueDate,
                    amount: feeInfo.fee?.amount as number,
                    dueAmount: feeInfo.fee?.amount as number,
                    status: 'PENDING',
                    method: 'NA'
                }
            });
        }

        // Update TermSubjectGroupSubject
        const subject = await db.subject.findUnique({
            where: {
                name: enrollmentItem.subject
            },
            select: {
                id: true
            }
        });
        await db.termSubjectGroupSubject.updateMany({
            where: {
                termId: enrollmentItem.termId,
                subjectGroupId: enrollmentItem.subjectGroupId,
                subjectId: subject?.id,
                termSubjectGroupId: enrollmentItem.termSubjectGroupId
            },
            data: { enrollmentId: newEnrollment.id }
        });

        enrollmentIds.push(newEnrollment.id);
    }

    return { message: 'Enrollment successful', enrollmentIds };
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
            const data = await findEnrolledStudentById(sibling.id.toString());
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
