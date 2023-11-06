// import { UpdateStudentDetailSchema } from '../schema/admin.dto/admin.dto';
import { z } from 'zod';
import { UpdateStudentPersonalDetailSchema } from '../../schema/admin.dto/student.dto';
import { NewStudentSchema } from '../../schema/newStudent.dto/newStudent.dto';
import { db } from '../../utils/db.server';

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
// findSiblingsByParentEmail('david@example.com')?

//  find feedback for a student for admin and teacher
export async function findFeedbackByStudentId(id: string, page: number) {
    const take = 5;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const students = await db.feedback.findMany({
        skip,
        take,
        where: {
            Student: {
                is: {
                    id: +id
                }
            }
        }
    });
    console.log(students);
}

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

// fins unique student using email
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

// find student using general search  for search fnction in student table
export async function findStudentsBySearch(search: string, page: number) {
    const take = 5;
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

// Find all student for the admin
export async function findAllStudents(page: number) {
    const take = 5;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const students = await db.student.findMany({
        skip,
        take,
        select: {
            id: true,
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
                    id: true,
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
    const count = await db.student.aggregate({
        _count: {
            id: true
        }
    });
    if (students && students.length != 0) {
        return { students, count };
    } else {
        throw new Error('All students queryAPI did not return anything :error @ksm');
    }
}

// delete student
export async function deleteManyStudents() {
    const student = await db.student.deleteMany();
}

// create student feedback for admin or teachers using student id
export async function createStudentFeedback(data: string, id: string) {
    try {
        const feedback = await db.feedback.create({
            data: {
                studentId: +id,
                feedback: data
            }
        });
        console.log(feedback);
    } catch (e) {
        console.log(e);
        throw new Error(`Feedback connot be create @ksm ${e}`);
    }
}

// Find siblings of a student using parent email
export async function findSiblingsByParentEmail(email: string) {
    try {
        const siblings = await db.student.groupBy({
            by: ['id'],
            where: {
                parentsDetails: {
                    is: {
                        parentEmail: email
                    }
                }
            }
        });
        console.log(siblings);
        let siblingsDetails: any = [];
        for (let sibling of siblings) {
            const data = await findStudentById(sibling.id.toString());
            siblingsDetails = [...siblingsDetails, data];
            // console.log(data);
        }
        console.log('details:', siblingsDetails);
    } catch (e) {
        console.log(e);
        return new Error(`Feedback connot be create @ksm ${e}`);
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
    if (existingStudent?.id != +id) {
        throw new Error(`email or contact already exists`);
    } else {
        try {
            const updateStudent = await db.student.update({
                where: {
                    id: +id
                },
                data: {
                    personalDetails: {
                        update: {
                            role: role as RoleEnum,
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
                    }
                }
            });
            return updateStudent;
        } catch (e) {
            throw new Error(`Failed to update student personal details @ksm${e}`);
        }
    }
}

// update student parents details service
