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
export async function findTermToEnroll() {
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

/* enroll applicant to subjects */
export async function enrollApplicant(enrollData: ApplicantEnrollDataSchema['body']) {
    console.log(enrollData);
    let alreadyEnrolledSubjects = []; // Array to store names of already enrolled subjects

    // Iterate through each enrollment data item
    for (const enrollmentItem of enrollData.enrollData) {
        // Fetch existing enrollments for the student with the specific termSubjectGroupId
        const existingEnrollments = await db.enrollment.findMany({
            where: {
                studentId: enrollData.applicantId,
                termSubjectGroupId: enrollmentItem.termSubjectGroupId
            },
            include: {
                subjectEnrollments: {
                    include: {
                        termSubject: true // Include termSubject to access the subjectId
                    }
                }
            }
        });

        // Check if any existing enrollment includes the specific subject
        for (const enrollment of existingEnrollments) {
            const isAlreadyEnrolledInSubject = enrollment.subjectEnrollments.some((se) => se.termSubjectId === enrollmentItem.termSubjectId);

            if (isAlreadyEnrolledInSubject) {
                // Add the subject name to the array if the student is already enrolled in it
                alreadyEnrolledSubjects.push(enrollmentItem.subject);
                // Do not break here, continue to check other enrollments
            }
        }
    }

    console.log('Already Enrolled Subjects: ', alreadyEnrolledSubjects);
    if (alreadyEnrolledSubjects.length > 0) {
        throw customError(`The subjects you are trying to enroll is already enrolled for this applicant `, 'fail', 400, true);
    }

    // sof
    let enrollmentIds = [];
    for (const enrollmentItem of enrollData.enrollData) {
        const feeInfo = await db.termSubjectGroup.findUnique({
            where: { id: enrollmentItem.termSubjectGroupId },
            include: { fee: true, term: true }
        });
        let dueDate;
        if (feeInfo?.fee?.paymentType === 'MONTHLY') {
            // Set due date to 5 days before the end of the current month
            const now = new Date();
            dueDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of the current month
            dueDate.setDate(dueDate.getDate() - 5); // 5 days before the month end
        } else if (feeInfo?.fee?.paymentType === 'TERM') {
            // Assuming a term is 6 months, set due date every two months from the start of the term
            const termStartDate = new Date(feeInfo.term.startDate);
            dueDate = new Date(termStartDate.setMonth(termStartDate.getMonth() + 2)); // Every two months from the term start date
        } else {
            // Default due date or handle other cases
            dueDate = new Date(); // Set a default due date or handle as required
        }
        // Create a new enrollment record along with SubjectEnrollment records
        const newEnrollment = await db.enrollment.create({
            data: {
                studentId: enrollData.applicantId,
                termSubjectGroupId: enrollmentItem.termSubjectGroupId,
                dueDate: dueDate, // Example, set the due date
                // Nested write to create SubjectEnrollment
                subjectEnrollments: {
                    create: [
                        {
                            termSubjectId: enrollmentItem.termSubjectId
                            // grade and attendance can be omitted here, they will use default values
                        }
                    ]
                }
            },
            select: {
                id: true
            }
        });
        if (feeInfo?.feeId) {
            await db.feePayment.create({
                data: {
                    feeId: feeInfo.feeId,
                    enrollmentId: newEnrollment.id,
                    dueDate: dueDate,
                    amount: feeInfo?.fee?.amount as number, // Assuming amount is stored in the fee record
                    dueAmount: feeInfo?.fee?.amount as number,
                    status: 'PENDING',
                    method: 'NA'
                }
            });
        }
        const subjectId = await db.subject.findUnique({
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
                subjectId: subjectId?.id,
                termSubjectGroupId: enrollmentItem.termSubjectGroupId
            },
            data: {
                enrollmentId: newEnrollment.id
            }
        });
        enrollmentIds.push(newEnrollment.id);
    }
    return { message: 'Enrollment successful', enrollmentIds: enrollmentIds };
}
/* fetch all enrolled subjects for the appicant*/

export async function findApplicantEnrolledSubjects(id: string) {
    // Fetch all enrollments for the student
    const enrollments = await db.enrollment.findMany({
        where: { studentId: parseInt(id) },
        include: {
            subjectEnrollments: {
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
        enrollment.subjectEnrollments.forEach((se) => {
            enrolledSubjects.push({
                subjectId: se.termSubject.subjectId,
                subjectName: se.termSubject.subject.name
                // Include additional subject details as needed
            });
        });
    });

    // Return the list of enrolled subjects
    return enrolledSubjects;
}

export async function enrollApplicantToStudent(id: string) {
    // Fetch the student record
    const student = await db.student.findUnique({
        where: { id: parseInt(id) }
    });

    // Check if student record exists
    if (!student) {
        throw customError(`No student found with ID ${id}`, 'fail', 404, true);
    }
    const enrollments = await db.enrollment.findMany({
        where: { studentId: parseInt(id) }
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
        where: { id: parseInt(id) },
        data: { role: 'STUDENT' }
    });

    return { message: `The applicant enrolled to Student successfully` };
}
