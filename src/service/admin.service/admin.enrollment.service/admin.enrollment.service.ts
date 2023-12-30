import { db } from '../../../utils/db.server';
import { customError } from '../../../utils/customError';
import { ApplicantEnrollDataSchema } from '../../../schema/admin.dto/admin.enrollment.dto/admin.enrollment.dto';

export async function findAllApplicants(page: number) {
    const take = 10;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const applicants = await db.student.findMany({
        where: {
            role: 'APPLICANT',
            isActive: false
        },
        skip,
        take,
        select: {
            id: true,
            role: true,
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
            role: 'APPLICANT'
        },
        _count: {
            id: true
        }
    });

    if (applicants.length == 0) {
        throw customError(`No applicants lists to show`, 'fail', 400, true);
    }

    return { applicants, count };
}

export async function searchApplicants(search: string, page: number) {
    const take = 10;
    if (search.length == 0) {
        throw customError(`No Search query string available`, 'fail', 400, true);
    }
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const applicants = await db.student.findMany({
        skip,
        take,
        where: {
            role: 'APPLICANT',
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
            role: 'APPLICANT',
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

    if (applicants.length == 0) {
        throw customError(`No applicants lists to show`, 'fail', 400, true);
    }

    return { applicants, count };
}

/*find applicant by ID*/
export async function findApplicantById(id: string) {
    const applicant = await db.student.findUnique({
        where: {
            id: +id,
            role: 'APPLICANT'
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

    return applicant;
}
/* find published term to enroll*/
export async function findPublishedTermToEnroll() {
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

    // if (!publishTerm) {
    //     throw customError(`Pubslished Term could not found. Please try again later`, 'fail', 404, true);
    // }

    return publishTerm;
}
/* find current term to enroll*/
export async function findCurrentTermToEnroll() {
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

    if (!currentTerm) {
        throw customError(`Pubslished Term could not found. Please try again later`, 'fail', 404, true);
    }

    return currentTerm;
}
/* enroll applicant to subjects */
// export async function enrollApplicant(enrollData: ApplicantEnrollDataSchema['body']) {
//     let alreadyEnrolledSubjects = [];
//     let uniqueTermSubjectGroupIds = new Set();

//     // Check Existing Enrollments
//     for (const enrollmentItem of enrollData.enrollData) {
//         uniqueTermSubjectGroupIds.add(enrollmentItem.termSubjectGroupId);
//         const existingEnrollments = await db.enrollment.findMany({
//             where: { studentId: enrollData.applicantId, termSubjectGroupId: enrollmentItem.termSubjectGroupId },
//             include: { subjectEnrollment: { include: { termSubject: true } } }
//         });
//         // *************************************
//         for (const enrollment of existingEnrollments) {
//             // Directly check the subjectEnrollment object
//             if (enrollment.subjectEnrollment && enrollment.subjectEnrollment.termSubjectId === enrollmentItem.termSubjectId) {
//                 alreadyEnrolledSubjects.push(enrollmentItem.subject);
//             }
//         }
//     }

//     if (alreadyEnrolledSubjects.length > 0) {
//         throw customError(`Already enrolled in subjects: ${alreadyEnrolledSubjects.join(', ')}`, 'fail', 404, true);
//     }

//     let enrollmentIds = [];
//     for (const enrollmentItem of enrollData.enrollData) {
//         // Fetch fee info
//         const feeInfo = await db.termSubjectGroup.findUnique({
//             where: { id: enrollmentItem.termSubjectGroupId },
//             include: { fee: true, term: true }
//         });

//         // Determine due date
//         let dueDate;
//         if (feeInfo?.fee?.paymentType === 'MONTHLY') {
//             const now = new Date();
//             dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
//             dueDate.setDate(dueDate.getDate() - 5);
//         } else if (feeInfo?.fee?.paymentType === 'TERM') {
//             const termStartDate = new Date(feeInfo.term.startDate);
//             dueDate = new Date(termStartDate.setMonth(termStartDate.getMonth() + 2));
//         } else {
//             dueDate = new Date();
//         }

//         // Create Enrollment and SubjectEnrollment
//         const newEnrollment = await db.enrollment.create({
//             data: {
//                 studentId: enrollData.applicantId,
//                 termSubjectGroupId: enrollmentItem.termSubjectGroupId,
//                 dueDate: dueDate
//             },
//             select: { id: true }
//         });

//         const newSubjectEnrollment = await db.subjectEnrollment.create({
//             data: {
//                 enrollmentId: newEnrollment.id,
//                 termSubjectId: enrollmentItem.termSubjectId
//             }
//         });

//         // Update the Enrollment with the SubjectEnrollment ID
//         await db.enrollment.update({
//             where: { id: newEnrollment.id },
//             data: { subjectEnrollmentId: newSubjectEnrollment.id }
//         });

//         // Handle FeePayment and StudentTermFee
//         if (feeInfo?.feeId) {
//             const studentTermFee = await db.studentTermFee.upsert({
//                 where: {
//                     studentId_termSubjectGroupId_termId: {
//                         studentId: enrollData.applicantId,
//                         termSubjectGroupId: enrollmentItem.termSubjectGroupId,
//                         termId: feeInfo.termId
//                     }
//                 },
//                 update: {},
//                 create: {
//                     studentId: enrollData.applicantId,
//                     termSubjectGroupId: enrollmentItem.termSubjectGroupId,
//                     termId: feeInfo.termId
//                 }
//             });

//             await db.feePayment.create({
//                 data: {
//                     feeId: feeInfo.feeId,
//                     studentTermFeeId: studentTermFee.id,
//                     dueDate: dueDate,
//                     amount: feeInfo.fee?.amount as number,
//                     dueAmount: feeInfo.fee?.amount as number,
//                     status: 'PENDING',
//                     method: 'NA'
//                 }
//             });
//         }

//         // Update TermSubjectGroupSubject
//         const subject = await db.subject.findUnique({
//             where: {
//                 name: enrollmentItem.subject
//             },
//             select: {
//                 id: true
//             }
//         });
//         await db.termSubjectGroupSubject.updateMany({
//             where: {
//                 termId: enrollmentItem.termId,
//                 subjectGroupId: enrollmentItem.subjectGroupId,
//                 subjectId: subject?.id,
//                 termSubjectGroupId: enrollmentItem.termSubjectGroupId
//             },
//             data: { enrollmentId: newEnrollment.id }
//         });

//         enrollmentIds.push(newEnrollment.id);
//     }
//     const messages = await enrollApplicantToStudent(enrollData.applicantId);

//     return { message: 'Enrollment successful and The applicant enrolled to Student successfully`', enrollmentIds, messages };
// }


export async function enrollApplicant(enrollData: ApplicantEnrollDataSchema['body']) {
    let alreadyEnrolledSubjects = [];

    for (const enrollmentItem of enrollData.enrollData) {
        const existingEnrollments = await db.enrollment.findMany({
            where: { studentId: enrollData.applicantId, termSubjectGroupId: enrollmentItem.termSubjectGroupId },
            include: { subjectEnrollment: { include: { termSubject: true } } }
        });

        for (const enrollment of existingEnrollments) {
            if (enrollment.subjectEnrollment && enrollment.subjectEnrollment.termSubjectId === enrollmentItem.termSubjectId) {
                alreadyEnrolledSubjects.push(enrollmentItem.subject);
            }
        }
    }

    if (alreadyEnrolledSubjects.length > 0) {
        throw new Error(`Already enrolled in subjects: ${alreadyEnrolledSubjects.join(', ')}`);
    }

    let uniqueTermSubjectGroupIds = new Set<number>();

    for (const enrollmentItem of enrollData.enrollData) {
        uniqueTermSubjectGroupIds.add(enrollmentItem.termSubjectGroupId);

        const feeInfo = await db.termSubjectGroup.findUnique({
            where: { id: enrollmentItem.termSubjectGroupId },
            include: { fee: true, term: true }
        });

        // Determine due date
        let dueDate = new Date();
        if (feeInfo?.fee?.paymentType === 'MONTHLY') {
            const now = new Date();
            dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            dueDate.setDate(dueDate.getDate() - 5);
        } else if (feeInfo?.fee?.paymentType === 'TERM') {
            const termStartDate = new Date(feeInfo.term.startDate);
            dueDate = new Date(termStartDate.setMonth(termStartDate.getMonth() + 2));
        }

        const newEnrollment = await db.enrollment.create({
            data: {
                studentId: enrollData.applicantId,
                termSubjectGroupId: enrollmentItem.termSubjectGroupId,
                dueDate: dueDate,
            },
            select: { id: true }
        });

        await db.subjectEnrollment.create({
            data: {
                enrollmentId: newEnrollment.id,
                termSubjectId: enrollmentItem.termSubjectId
            }
        });
    }

    // Create feePayment records based on unique TermSubjectGroupIds
    for (const termSubjectGroupId of uniqueTermSubjectGroupIds) {
        const feeInfo = await db.termSubjectGroup.findUnique({
            where: { id: termSubjectGroupId },
            include: { fee: true , enrollment:true}
        });

        if (feeInfo?.feeId) {
            const studentTermFee = await db.studentTermFee.upsert({
                where: {
                    studentId_termSubjectGroupId_termId: {
                        studentId: enrollData.applicantId,
                        termSubjectGroupId: termSubjectGroupId,
                        termId: feeInfo.termId
                    }
                },
                update: {},
                create: {
                    studentId: enrollData.applicantId,
                    termSubjectGroupId: termSubjectGroupId,
                    termId: feeInfo.termId
                },
                select: { id: true }
            });

            await db.feePayment.create({
                data: {
                    feeId: feeInfo.feeId,
                    studentTermFeeId: studentTermFee.id,
                    dueDate: feeInfo?.enrollment?.find(en=>en.termSubjectGroupId===termSubjectGroupId)?.dueDate || new Date(),
                    amount: feeInfo.fee?.amount || 0,
                    dueAmount: feeInfo.fee?.amount || 0,
                    status: 'PENDING',
                    method: 'NA'
                }
            });
        }
    }

    const messages = await enrollApplicantToStudent(enrollData.applicantId); // Assuming this function exists

    return { message: 'Enrollment successful', messages };
}




/* de-enroll applicant to subjects */
// export async function deEnrollApplicant(deEnrollData: ApplicantEnrollDataSchema['body']) {
//     let deEnrolledSubjects = [];

//     for (const deEnrollItem of deEnrollData.enrollData) {
//         // Find the SubjectEnrollment record
//         const subjectEnrollment = await db.subjectEnrollment.findFirst({
//             where: {
//                 termSubjectId: deEnrollItem.termSubjectId,
//                 enrollment: {
//                     studentId: deEnrollData.applicantId,
//                     termSubjectGroupId: deEnrollItem.termSubjectGroupId
//                 }
//             }
//         });

//         if (!subjectEnrollment) {
//             throw customError(`Not enrolled in subjects: ${deEnrollItem.subject}`, 'fail', 404, true);
//         }

//         // Delete the SubjectEnrollment record
//         await db.subjectEnrollment.delete({
//             where: { id: subjectEnrollment.id }
//         });

//         // Optionally, if no other subjects are enrolled in the same termSubjectGroup, delete the Enrollment record
//         const remainingEnrollments = await db.subjectEnrollment.count({
//             where: {
//                 enrollment: {
//                     studentId: deEnrollData.applicantId,
//                     termSubjectGroupId: deEnrollItem.termSubjectGroupId
//                 }
//             }
//         });

//         if (remainingEnrollments === 0) {
//             await db.enrollment.delete({
//                 where: { id: subjectEnrollment.enrollmentId }
//             });
//         }

//         deEnrolledSubjects.push(deEnrollItem.subject);
//     }

//     return {
//         message: 'De-enrollment process completed',
//         deEnrolledSubjects
//     };
// }
export async function deEnrollApplicant(deEnrollData: ApplicantEnrollDataSchema['body']) {
    let deEnrolledSubjects = [];

    for (const deEnrollItem of deEnrollData.enrollData) {
        // Find the SubjectEnrollment record
        const subjectEnrollment = await db.subjectEnrollment.findFirst({
            where: {
                termSubjectId: deEnrollItem.termSubjectId,
                enrollment: {
                    studentId: deEnrollData.applicantId,
                    termSubjectGroupId: deEnrollItem.termSubjectGroupId
                }
            }
        });

        if (!subjectEnrollment) {
            throw new Error(`Not enrolled in subjects: ${deEnrollItem.subject}`);
        }

        // Delete the SubjectEnrollment record
        await db.subjectEnrollment.delete({
            where: { id: subjectEnrollment.id }
        });

        // Check if there are remaining SubjectEnrollments in the same TermSubjectGroup
        const remainingSubjectEnrollments = await db.subjectEnrollment.count({
            where: {
                enrollment: {
                    studentId: deEnrollData.applicantId,
                    termSubjectGroupId: deEnrollItem.termSubjectGroupId
                }
            }
        });

        if (remainingSubjectEnrollments === 0) {
            // Delete the Enrollment record
            await db.enrollment.delete({
                where: { id: subjectEnrollment.enrollmentId }
            });

            // Find and delete the associated StudentTermFee record
            const studentTermFee = await db.studentTermFee.findFirst({
                where: {
                    studentId: deEnrollData.applicantId,
                    termSubjectGroupId: deEnrollItem.termSubjectGroupId,
                    termId: deEnrollItem.termId
                }
            });

            if (studentTermFee) {
                // Delete associated FeePayments if any
                await db.feePayment.deleteMany({
                    where: {
                        studentTermFeeId: studentTermFee.id
                    }
                });

                // Delete the StudentTermFee record
                await db.studentTermFee.delete({
                    where: {
                        id: studentTermFee.id
                    }
                });
            }
        }

        deEnrolledSubjects.push(deEnrollItem.subject);
    }

    return {
        message: 'De-enrollment process completed',
        deEnrolledSubjects
    };
}


/* fetch all enrolled subjects for the appicant*/
export async function findApplicantEnrolledSubjects(id: string) {
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

    // Return the list of enrolled subjects
    return enrolledSubjects;
}

export async function enrollApplicantToStudent(id: number) {
    // Fetch the student record
    const student = await db.student.findUnique({
        where: { id }
    });

    // Check if student record exists
    if (!student) {
        throw customError(`No student found with ID ${id}`, 'fail', 404, true);
    }
    const enrollments = await db.enrollment.findMany({
        where: { studentId: id }
    });

    if (enrollments.length === 0) {
        throw customError(`No enrollments found for the applicant. Please enroll a subject at the subject & classes tab.`, 'fail', 404, true);
    }

    // Check if the student's role is already 'STUDENT'
    if (student.role === 'STUDENT') {
        throw customError(`The applicant is already a student`, 'fail', 404, true);
    }

    // Update the student's role to 'STUDENT'
    await db.student.update({
        where: { id },
        data: { role: 'STUDENT' }
    });

    return { message: `The applicant enrolled to Student successfully` };
}
