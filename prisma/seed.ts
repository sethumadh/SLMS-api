import { PrismaClient, Prisma } from '@prisma/client';
import { NewApplicantSchema } from '../src/schema/new.applicant.dto/new.applicant.dto';

const prisma = new PrismaClient();

const studentSeedData: NewApplicantSchema['body'][] = [];
for (let i = 1; i <= 10; i++) {
    studentSeedData.push({
        personalDetails: {
            firstName: `Name${i}`,
            lastName: `Lopez${i}`,
            DOB: `09-03-200${6 + i}`,
            gender: i % 2 === 0 ? 'male' : 'female',
            email: `emil${i}@domain.com`,
            contact: `03990345${63 + i}`,
            address: `789 Elm Avenue, Apt ${i}`,
            suburb: `Suburb${i}`,
            state: 'California',
            country: 'USA',
            postcode: `124${i}`,
            image: ''
        },
        parentsDetails: {
            fatherName: `Father${i}`,
            motherName: `Mother${i}`,
            parentEmail: `parent${i}@example.com`,
            parentContact: `01234${560 + i}`
        },
        emergencyContact: {
            contactPerson: `Contact${i}`,
            contactNumber: `00112233${50 + i}`,
            relationship: 'cousin'
        },
        healthInformation: {
            medicareNumber: `3680${320 + i}23`,
            ambulanceMembershipNumber: `${1111 + i}`,
            medicalCondition: 'None',
            allergy: 'None'
        },
        subjectInterest: {
            subjectsChosen: ['Math', 'English'],
            subjectRelated: ['option-1', 'option-2']
        },
        otherInformation: {
            otherInfo: `Info ${i}`,
            declaration: ["I pledge to follow the school's rules."]
        }
    });
}

async function seedStudents() {
    console.log('Start seeding students...');

    for (const student of studentSeedData) {
        const {
            emergencyContact: { contactNumber, contactPerson, relationship },
            healthInformation: { allergy, medicalCondition, medicareNumber, ambulanceMembershipNumber },
            otherInformation: { declaration, otherInfo },
            parentsDetails: { fatherName, motherName, parentContact, parentEmail },
            personalDetails: { email, address, contact, country, firstName, gender, lastName, postcode, state, suburb, DOB, image },
            subjectInterest: { subjectRelated, subjectsChosen }
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
