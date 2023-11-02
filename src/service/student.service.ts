import { NewStudentSchema } from '../schema/student.schema';
import { db } from '../utils/db.server';

export async function findStudents() {
    const students = await db.student.findMany({
        include: {
            personalDetails: true,
            parentsDetails: true,
            emergencyContact: true,
            healthInformation: true,
            subjects: true,
            otherInformation: true
        }
    });
    if (students) {
        return students;
    } else {
        throw new Error('student not found');
    }
}
export async function deleteManyStudents() {
    const student = await db.student.deleteMany({});
}
export async function createStudent(data: NewStudentSchema['body']) {
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
                    subjects,
                    subjectRelated
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
    if (student) {
        return student;
    } else {
        throw new Error('Student cannot be created');
    }
}
