import { PrismaClient, Prisma } from '@prisma/client';
import { studentSeedData } from '../mockData/StudentData';

const prisma = new PrismaClient();

// const studentData: Prisma.StudentCreateInput;

async function seedStudents() {
    console.log('Start seeding students...');
    for (const student of studentSeedData) {
        const {
            emergencyContact: { contactNumber, contactPerson, relationship },
            healthInformation: { allergy, medicalCondition, medicareNumber, ambulanceMembershipNumber },
            otherInformation: { declaration, otherInfo },
            parentsDetails: { fatherName, motherName, parentContact, parentEmail },
            personalDetails: { email, address, contact, country, firstName, gender, lastName, postcode, state, suburb, DOB, image },
            subjects: { subjects, subjectRelated }
        } = student;
        const studentsCreated = await prisma.student.create({
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
        //   console.log(`Created student with id: ${student.id}`);
    }
    console.log('Seeding finished.');
}

seedStudents()
    .catch(async (error) => {
        console.error('Error seeding students:', error);
        await prisma.$disconnect();
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
