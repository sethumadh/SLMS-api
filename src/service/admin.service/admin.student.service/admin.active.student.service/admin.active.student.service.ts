import { db } from '../../../../utils/db.server';
import { customError } from '../../../../utils/customError';

// Find all active student for the admin
export async function findActiveStudents(page: number, termId: number) {
    const take = 10;
    const pageNum = page ?? 0;
    const skip = pageNum * take;

    const activeStudents = await db.student.findMany({
        where: {
            role: 'STUDENT',
            isActive: true,
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
            isActive: true,
            studentTermFee: {
                some: {
                    termId: termId
                }
            }
        }
    });

    return { activeStudents, count };
}

// search active student for the admin
export async function searchActiveStudents(search = '', page: number, termId: number, subjectOption = '') {
    const take = 10;

    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const activeStudents = await db.student.findMany({
        skip,
        take,
        orderBy: {
            createdAt: 'desc'
        },
        where: {
            role: 'STUDENT',
            isActive: true,
            studentTermFee: {
                some: {
                    termId: +termId,
                    termSubjectGroup: {
                        subject: {
                            some: {
                                name: subjectOption ? subjectOption : undefined
                            }
                        }
                    }
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
            isActive: true,
            studentTermFee: {
                some: {
                    termId: +termId,
                    termSubjectGroup: {
                        subject: {
                            some: {
                                name: subjectOption
                            }
                        }
                    }
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

    return { activeStudents, count };
}

// find unqiue student by ID for internal queries
export async function findActiveStudentById(id: string) {
    const activeStudent = await db.student.findUnique({
        where: {
            id: +id,
            role: 'STUDENT',
            isActive: true
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
            },
            enrollments: {
                select: {
                    subjectEnrollment: true
                }
            }
        }
    });

    return activeStudent;
}
export async function findStudentFeeDetails(studentId: number, termId: number) {
    const studentTermFees = await db.studentTermFee.findMany({
        where: {
            studentId: studentId,
            termSubjectGroup: {
                termId
            }
        },
        include: {
            termSubjectGroup: {
                include: {
                    fee: true,
                    subjectGroup: true,
                    subject: true,
                    enrollment: {
                        where: {
                            studentId
                        },
                        select: {
                            dueDate: true,
                            subjectEnrollment: {
                                include: {
                                    termSubject: {
                                        select: {
                                            subject: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            feePayment: true
        }
    });

    return studentTermFees;
}

export async function findTermSubjectGroupIdEnrolledSubjects(id: string, termSubjectGroupId: string) {
    // Fetch all enrollments for the student
    const enrollments = await db.enrollment.findMany({
        where: {
            studentId: parseInt(id),
            termSubjectGroup: {
                id: +termSubjectGroupId
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
/*find fee details by id*/
export async function findFeePaymentById(id: string) {
    const feePaymentById = await db.feePayment.findUnique({
        where: {
            id: +id
        }
    });
    return feePaymentById;
}
/*update fee - amount paid made by the admin*/
export async function updateAmountPaid(id: string, newAmountPaid: string, remarks: string) {
    const amountPaid = parseInt(newAmountPaid);
    const currentFeePayment = await db.feePayment.findUnique({
        where: { id: +id },
        select: { dueAmount: true, amountPaid: true, creditAmount: true }
    });
    if (!currentFeePayment) {
        throw customError('Fee payment record not found', 'fail', 400, true);
    }

    // Apply existing credit to reduce due amount
    let remainingDueAmount = currentFeePayment.dueAmount - currentFeePayment.creditAmount;

    // Apply payment to remaining due amount
    remainingDueAmount -= amountPaid;
    // Calculate new credit amount
    let newCreditAmount = 0;
    if (remainingDueAmount < 0) {
        newCreditAmount = Math.max(amountPaid - currentFeePayment.dueAmount, 0);
        remainingDueAmount = 0;
    }

    // Update the fee payment record
    console.log(remainingDueAmount, newCreditAmount);
    const updatedFeePayment = await db.feePayment.update({
        where: { id: +id },
        data: {
            amountPaid: currentFeePayment.amountPaid + amountPaid,
            dueAmount: remainingDueAmount,
            creditAmount: newCreditAmount,
            status: remainingDueAmount > 0 ? 'PENDING' : 'NODUES',
            method: 'DISCOUNT',
            paidDate: new Date(),
            remarks
        }
    });

    return updatedFeePayment;
}
