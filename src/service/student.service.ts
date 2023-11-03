import { error } from 'console';
import { NewStudentSchema } from '../schema/student.dto';
import { db } from '../utils/db.server';

export async function findUniqueStudent(id: string) {
    const stdId = parseInt(id);
    console.log(stdId);
    const student = await db.student.findUnique({
        where: {
            id: stdId
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
        throw new Error('All students did not return anythin :error @ksm');
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
        throw new Error('Application cannot be created');
    }
}
