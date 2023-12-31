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
        subjectInterest: { subjectsChosen, subjectRelated }
    } = data;
    // const parsedDOB = new Date(DOB);
    // const formattedDOB = parsedDOB.toISOString();
    const existingStudent = await db.personalDetails.findFirst({
        where: {
            firstName,
            lastName,
            DOB: new Date(DOB),

            email
        },
        include: {
            student: {
                select: {
                    role: true
                }
            }
        }
    });
    if (existingStudent?.email) {
        if (existingStudent.student.role == 'APPLICANT') {
            throw customError(`The name, DOB and email given is already used for submitting an application. `, 'fail', 404, true);
        } else if (existingStudent.student.role == 'STUDENT') {
            throw customError(`TThe name, DOB and email given belongs to an existing student. `, 'fail', 404, true);
        } else if (existingStudent.student.role == 'ALUMNI') {
            throw customError(`The name, DOB and email given belongs to an alumni. please contact the school. `, 'fail', 404, true);
        }
    }
    try {
        const student = await db.student.create({
            data: {
                personalDetails: {
                    create: {
                        firstName,
                        lastName,
                        DOB: new Date(DOB),
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
                        medicareNumber: medicareNumber ? medicareNumber : 'No Medicare Number provided',
                        ambulanceMembershipNumber,
                        medicalCondition,
                        allergy
                    }
                },
                subjectsChosen,
                subjectRelated,
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
export async function findPublishTerm() {
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
                    level: true
                }
            },
            termSubjectGroup: {
                select: {
                    id: true,
                    fee: true,
                    subjectGroup: true
                }
            }
        }
    });

    if (!publishTerm) {
        throw customError(`Pubslished Term could not found. Please try again later`, 'fail', 404, true);
    }

    return publishTerm;
}
