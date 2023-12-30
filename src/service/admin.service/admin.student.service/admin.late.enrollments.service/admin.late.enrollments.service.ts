import { db } from '../../../../utils/db.server';
import { customError } from '../../../../utils/customError';
import { EnrolledStudentEnrollDataSchema } from '../../../../schema/admin.dto/admin.student.dto/admin.enrolledstudent/admin.enrolled.student.dto';

// Find all late enrollment - student for the admin
export async function findLateEnrolledStudents(page: number, termId: number) {
    const take = 10;
    const pageNum = page ?? 0;
    const skip = pageNum * take;

    const lateEnrolledStudents = await db.student.findMany({
        where: {
            role: 'STUDENT',
            isActive: false,
            studentTermFee: {
                some: {
                    termId: +termId
                }
            }
        },
        skip,
        take,
        orderBy: {
            createdAt: 'desc'
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
        }
    });

    const count = await db.student.count({
        where: {
            role: 'STUDENT',
            isActive: false,
            studentTermFee: {
                some: {
                    termId: termId
                }
            }
        }
    });

    return { lateEnrolledStudents, count };
}

// search late enrollment - student for the admin
export async function searchLateEnrolledStudents(search: string, page: number, termId: number) {
    const take = 10;
    if (search.length == 0) {
        throw customError(`No Search query string available`, 'fail', 400, true);
    }
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const lateEnrolledStudents = await db.student.findMany({
        skip,
        take,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            role: 'STUDENT',
            isActive: false,
            studentTermFee: {
                some: {
                    termId: +termId
                }
            },
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
        }
    });
    const count = await db.student.count({
        where: {
            role: 'STUDENT',
            isActive: false,
            studentTermFee: {
                some: {
                    termId: +termId
                }
            },
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

    return { lateEnrolledStudents, count };
}

// find unqiue late enrollment - student by ID for internal queries
export async function findLateEnrolledStudentById(id: string) {
    const lateEnrolledStudent = await db.student.findUnique({
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
    return lateEnrolledStudent;
}

// find term to enroll
export async function findTermToEnrollForLateEnrolledStudent() {
    const currentTerm = await db.term.findFirst({
        where: {
            currentTerm: true
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

    // if (!currentTerm) {
    //     throw customError(`current Term could not found. Please try again later`, 'fail', 404, true);
    // }

    return currentTerm;
}
export async function findLateEnrolledStudentEnrolledSubjects(id: string, termId: string) {
    // Fetch all enrollments for the student
    const enrollments = await db.enrollment.findMany({
        where: {
            studentId: parseInt(id),
            termSubjectGroup: {
                termId: +termId
            }
        },
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
        if (enrollment.subjectEnrollment) {
            // Check if subjectEnrollment exists
            const se = enrollment.subjectEnrollment;
            enrolledSubjects.push({
                subjectId: se.termSubject.subjectId,
                subjectName: se.termSubject.subject.name
                // Include additional subject details as needed
            });
        }
    });

    return enrolledSubjects;
}

/* enroll enrolled student to subjects */
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
                dueDate: dueDate
            },
            select: { id: true }
        });

        const newSubjectEnrollment = await db.subjectEnrollment.create({
            data: {
                enrollmentId: newEnrollment.id,
                termSubjectId: enrollmentItem.termSubjectId
            }
        });

        // Update the Enrollment with the SubjectEnrollment ID
        await db.enrollment.update({
            where: { id: newEnrollment.id },
            data: { subjectEnrollmentId: newSubjectEnrollment.id }
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

/* de-enroll enrolled student to subjects */
export async function deEnrollStudentEnrolledToSubjects(deEnrollData: EnrolledStudentEnrollDataSchema['body']) {
    let deEnrolledSubjects = [];

    for (const deEnrollItem of deEnrollData.enrollData) {
        // Find the SubjectEnrollment record
        const subjectEnrollment = await db.subjectEnrollment.findFirst({
            where: {
                termSubjectId: deEnrollItem.termSubjectId,
                enrollment: {
                    studentId: deEnrollData.enrolledStudentId,
                    termSubjectGroupId: deEnrollItem.termSubjectGroupId
                }
            }
        });

        if (!subjectEnrollment) {
            throw customError(`Not enrolled in subjects: ${deEnrollItem.subject}`, 'fail', 404, true);
        }

        // Delete the SubjectEnrollment record
        await db.subjectEnrollment.delete({
            where: { id: subjectEnrollment.id }
        });

        // Optionally, if no other subjects are enrolled in the same termSubjectGroup, delete the Enrollment record
        const remainingEnrollments = await db.subjectEnrollment.count({
            where: {
                enrollment: {
                    studentId: deEnrollData.enrolledStudentId,
                    termSubjectGroupId: deEnrollItem.termSubjectGroupId
                }
            }
        });

        if (remainingEnrollments === 0) {
            await db.enrollment.delete({
                where: { id: subjectEnrollment.enrollmentId }
            });
        }

        deEnrolledSubjects.push(deEnrollItem.subject);
    }

    return {
        message: 'De-enrollment process completed',
        deEnrolledSubjects
    };
}

export async function lateEnrolledActiveStudent(id: number, termId: string) {
    // Fetch the student record
    const student = await db.student.findUnique({
        where: { id, role: 'STUDENT' }
    });

    // Check if student record exists
    if (!student) {
        throw customError(`No student found with ID ${id}`, 'fail', 404, true);
    }
    const enrollments = await db.enrollment.findMany({
        where: {
            studentId: id,
            termSubjectGroup: {
                termId: +termId
            }
        }
    });

    if (enrollments.length === 0) {
        throw customError(`No enrollments found for the applicant. Please enroll a subject at the subject & classes tab.`, 'fail', 404, true);
    }

    // Update the student's role to 'STUDENT'
    await db.student.update({
        where: { id },
        data: { isActive: true }
    });

    return { message: `The applicant enrolled to Student successfully` };
}
