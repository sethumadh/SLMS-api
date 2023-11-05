import { NewStudentSchema } from '../schema/student.dto';
import { customError } from '../utils/customError';
import { db } from '../utils/db.server';

// findAllStudents()--
// createStudent(data)--
// findStudentById('1')--

// findByEmail('en@example.com');
// filterStudentsBySubjects(['Science', 'Math']);
// findStudentByEmail('b@b.com');
// findStudentsBySearch('e');
// findUniqueStudent('1')
// findFeedbackByStudentId('1')?
// createStudentFeedback('feedback for student 3', '3')

export async function findFeedbackByStudentId(id: string) {
    const students = await db.feedback.findMany({
        where: {
            Student: {
                is: {
                    id: parseInt(id)
                }
            }
        }
    });
    console.log(students);
}

export async function filterStudentsBySubjects(subjects: string[]) {
    const students = await db.student.findMany({
        where: {
            subjects: {
                subjects: {
                    some: {
                        subjectName: {
                            in: subjects
                        }
                    }
                }
            }
        }
    });
    console.log(students);
}
export async function findStudentByEmail(email: string) {
    const student = await db.personalDetails.findUnique({
        where: {
            email
        },
        include: {
            Student: true
        }
    });
    const studentDetail = await findStudentById(student?.Student?.id!.toString()!);
    console.log(studentDetail);
    return studentDetail;
}

export async function findStudentsBySearch(search: string) {
    const students = await db.student.findMany({
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
export async function findStudentById(id: string) {
    const stdId = parseInt(id);
    const student = await db.student.findUnique({
        where: {
            id: stdId
        },
        include: {
            personalDetails: {
                select: {
                    id: true,
                    role: true,
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
            subjects: {
                select: {
                    subjectRelated: {
                        select: {
                            id: true,
                            subjectRelated: true
                        }
                    },
                    subjects: {
                        select: {
                            id: true,
                            subjectName: true
                        }
                    }
                }
            },
            otherInformation: {
                select: {
                    id: true,
                    otherInfo: true,
                    declaration: true
                }
            },
            feedback: {
                select: {
                    id: true,
                    feedback: true
                }
            }
        }
    });

    return student;
}

export async function findAllStudents() {
    const students = await db.student.findMany({
        select: {
            personalDetails: {
                select: {
                    id: true,
                    role: true,
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
            subjects: {
                select: {
                    subjectRelated: {
                        select: {
                            id: true,
                            subjectRelated: true
                        }
                    },
                    subjects: {
                        select: {
                            id: true,
                            subjectName: true
                        }
                    }
                }
            },
            otherInformation: {
                select: {
                    id: true,
                    otherInfo: true,
                    declaration: true
                }
            },
            feedback: {
                select: {
                    id: true,
                    feedback: true
                }
            }
        },
        orderBy: {
            createdAt: 'asc'
        }
    });
    const count = await db.student.count();
    if (students) {
        return { students, count };
    } else {
        throw new Error('All students queryAPI did not return anything :error @ksm');
    }
}
export async function deleteManyStudents() {
    const student = await db.student.deleteMany({});
}
export async function createStudent(data: NewStudentSchema['body']) {
    try {
        const {
            emergencyContact: { contactNumber, contactPerson, relationship },
            healthInformation: { allergy, medicalCondition, medicareNumber, ambulanceMembershipNumber },
            otherInformation: { declaration, otherInfo },
            parentsDetails: { fatherName, motherName, parentContact, parentEmail },
            personalDetails: { email, address, contact, country, firstName, gender, lastName, postcode, state, suburb, DOB, image },
            subjects: { subjects, subjectRelated }
        } = data;
        const student = await db.student.create({
            data: {
                personalDetails: {
                    create: {
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
                        medicareNumber,
                        ambulanceMembershipNumber,
                        medicalCondition,
                        allergy
                    }
                },
                subjects: {
                    create: {
                        subjects: {
                            createMany: {
                                data: subjects.map((subject) => ({
                                    subjectName: subject
                                }))
                            }
                        },
                        subjectRelated: {
                            createMany: {
                                data: subjectRelated.map((subjectRel) => ({
                                    subjectRelated: subjectRel
                                }))
                            }
                        }
                    }
                },

                otherInformation: {
                    create: {
                        otherInfo: otherInfo ? otherInfo : 'No information provided',
                        declaration
                    }
                }
            }
        });
    } catch (e) {
        console.log(e);
        throw new Error('Failed to create application'); // Return an error message.
    }
}
export async function createStudentFeedback(data: string, id: string) {
    try {
    } catch (e) {
        console.log(e);
        throw new Error(`Feedback connot be create @ksm ${e}`);
    }
    const feedback = await db.feedback.create({
        data: {
            studentId: parseInt(id),
            feedback: data
        }
    });
    console.log(feedback);
}
