import { NewApplicantSchema } from '../../schema/new.applicant.dto/new.applicant.dto';
import { customError } from '../../utils/customError';
import { db } from '../../utils/db.server';

//  create new application
export async function createApplicant(data: NewApplicantSchema['body']) {
    const {
        emergencyContact: { contactNumber, contactPerson, relationship },
        healthInformation: { allergy, medicalCondition, medicareNumber, ambulanceMembershipNumber },
        otherInformation: { declaration, otherInfo },
        parentsDetails: { fatherName, motherName, parentContact, parentEmail },
        personalDetails: { email, address, contact, country, firstName, gender, lastName, postcode, state, suburb, DOB, image },
        subjects: { subjects, subjectRelated }
    } = data;
    try {
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
                // subjects: {
                //     create: {
                //         subjects: {
                //             createMany: {
                //                 data: subjects.map((subject) => ({
                //                     subjectName: subject
                //                 }))
                //             }
                //         },
                //         subjectRelated: {
                //             createMany: {
                //                 data: subjectRelated.map((subjectRel) => ({
                //                     subjectRelated: subjectRel
                //                 }))
                //             }
                //         }
                //     }
                // },

                otherInformation: {
                    create: {
                        otherInfo: otherInfo ? otherInfo : 'No information provided',
                        declaration
                    }
                }
            }
        });
        return student;
    } catch (e) {
        console.log(e);
        throw customError('Failed to create application', 'fail', 404, true); // Return an error message.
    }
}

/*To select the active term and its subjects and to display it in Application subjects section*/
export async function findActiveTerm() {
    const uniqueTerm = await db.term.findFirst({
        where: {
            currentTerm: true
        },
        select: {
            id: true,
            name: true,
            currentTerm: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            TermSubject: {
                select: {
                    subject: {
                        select: {
                            name: true,
                            fee: true,
                            isActive: true,
                            _count: true,
                            id: true
                        }
                    }
                }
            },
            _count: true
        }
    });
    if (!uniqueTerm) {
        throw customError(`Active Term could not found. Please try again later`, 'fail', 404, true);
    }
    return uniqueTerm;
}
