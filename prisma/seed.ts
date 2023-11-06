// import { PrismaClient, Prisma } from '@prisma/client';

// const studentsList = [
//     {
//         personalDetails: {
//             id: 1,
//             role: 'STUDENT',
//             firstName: 'sethu',
//             lastName: 'sethu',
//             DOB: '01-01-2000',
//             gender: 'male',
//             email: 'p@dq.com',
//             contact: '0999999990',
//             address: 'sethu',
//             suburb: 'sethu',
//             state: 'Victoria',
//             country: 'Australia',
//             postcode: '1234',
//             image: ''
//         },
//         parentsDetails: {
//             id: 1,
//             fatherName: 'sethu',
//             motherName: 'sethu',
//             parentEmail: 's@x.com',
//             parentContact: '0199999999'
//         },
//         emergencyContact: {
//             id: 1,
//             contactPerson: 'sethu',
//             contactNumber: '0999999999',
//             relationship: 'friend'
//         },
//         healthInformation: {
//             id: 1,
//             medicareNumber: '1111111110',
//             ambulanceMembershipNumber: '2222',
//             medicalCondition: 'sssss',
//             allergy: 'ssssss'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 1,
//                     subjectRelated: 'option-1'
//                 },
//                 {
//                     id: 2,
//                     subjectRelated: 'option-2'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 1,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 2,
//                     subjectName: 'Science'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 1,
//             otherInfo: 'No information provided',
//             declaration: ['hello']
//         }
//     },
//     {
//         personalDetails: {
//             id: 3,
//             role: 'STUDENT',
//             firstName: 'bhadra',
//             lastName: 'sethu',
//             DOB: '01-01-2000',
//             gender: 'male',
//             email: 'b@b.com',
//             contact: '0123456789',
//             address: 'bhadra',
//             suburb: 'bhadra',
//             state: 'Victoria',
//             country: 'Australia',
//             postcode: '1234',
//             image: ''
//         },
//         parentsDetails: {
//             id: 3,
//             fatherName: 'bhadra',
//             motherName: 'bhadra',
//             parentEmail: 'b@x.com',
//             parentContact: '0199999993'
//         },
//         emergencyContact: {
//             id: 3,
//             contactPerson: 'sethu',
//             contactNumber: '0999999999',
//             relationship: 'friend'
//         },
//         healthInformation: {
//             id: 3,
//             medicareNumber: '1111111113',
//             ambulanceMembershipNumber: '2222',
//             medicalCondition: 'sssss',
//             allergy: 'ssssss'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 3,
//                     subjectRelated: 'option-1'
//                 },
//                 {
//                     id: 4,
//                     subjectRelated: 'option-2'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 3,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 4,
//                     subjectName: 'Science'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 2,
//             otherInfo: 'No information provided',
//             declaration: ['hello']
//         }
//     },
//     {
//         personalDetails: {
//             id: 5,
//             role: 'STUDENT',
//             firstName: 'Olivia',
//             lastName: 'Brown',
//             DOB: '03-25-2005',
//             gender: 'female',
//             email: 'olivia@example.com',
//             contact: '0123456799',
//             address: '789 Willow Lane',
//             suburb: 'Smalltown',
//             state: 'California',
//             country: 'USA',
//             postcode: '1234',
//             image: ''
//         },
//         parentsDetails: {
//             id: 4,
//             fatherName: 'Michael Brown',
//             motherName: 'Emily Brown',
//             parentEmail: 'michael@example.com',
//             parentContact: '0123456789'
//         },
//         emergencyContact: {
//             id: 4,
//             contactPerson: 'Sophia Davis',
//             contactNumber: '0987654321',
//             relationship: 'sister'
//         },
//         healthInformation: {
//             id: 4,
//             medicareNumber: '7777777777',
//             ambulanceMembershipNumber: '4444',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 5,
//                     subjectRelated: 'option-1'
//                 },
//                 {
//                     id: 6,
//                     subjectRelated: 'option-2'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 5,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 6,
//                     subjectName: 'Science'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 3,
//             otherInfo: 'Member of Debate Club',
//             declaration: ["I pledge to uphold the school's rules and regulations."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 7,
//             role: 'STUDENT',
//             firstName: 'Liam',
//             lastName: 'Johnson',
//             DOB: '01-15-2003',
//             gender: 'male',
//             email: 'liam@example.com',
//             contact: '0123456781',
//             address: '321 Maple Lane',
//             suburb: 'Cityville',
//             state: 'New York',
//             country: 'USA',
//             postcode: '1235',
//             image: ''
//         },
//         parentsDetails: {
//             id: 5,
//             fatherName: 'David Johnson',
//             motherName: 'Linda Johnson',
//             parentEmail: 'david@example.com',
//             parentContact: '0987654322'
//         },
//         emergencyContact: {
//             id: 5,
//             contactPerson: 'Sophia Davis',
//             contactNumber: '0011223345',
//             relationship: 'sister'
//         },
//         healthInformation: {
//             id: 5,
//             medicareNumber: '8888888888',
//             ambulanceMembershipNumber: '1111',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 7,
//                     subjectRelated: 'option-3'
//                 },
//                 {
//                     id: 8,
//                     subjectRelated: 'option-4'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 7,
//                     subjectName: 'History'
//                 },
//                 {
//                     id: 8,
//                     subjectName: 'English'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 4,
//             otherInfo: 'Member of Drama Club',
//             declaration: ["I promise to adhere to the school's guidelines."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 8,
//             role: 'STUDENT',
//             firstName: 'Sophie',
//             lastName: 'Miller',
//             DOB: '11-20-2001',
//             gender: 'female',
//             email: 'sophie@example.com',
//             contact: '0123456782',
//             address: '456 Cedar Avenue',
//             suburb: 'Villagetown',
//             state: 'Queensland',
//             country: 'Australia',
//             postcode: '1236',
//             image: ''
//         },
//         parentsDetails: {
//             id: 6,
//             fatherName: 'Robert Miller',
//             motherName: 'Maria Miller',
//             parentEmail: 'robert@example.com',
//             parentContact: '0123456783'
//         },
//         emergencyContact: {
//             id: 6,
//             contactPerson: 'Oliver Adams',
//             contactNumber: '0011223346',
//             relationship: 'cousin'
//         },
//         healthInformation: {
//             id: 6,
//             medicareNumber: '5555555555',
//             ambulanceMembershipNumber: '3333',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 9,
//                     subjectRelated: 'option-5'
//                 },
//                 {
//                     id: 10,
//                     subjectRelated: 'option-6'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 9,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 10,
//                     subjectName: 'Biology'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 5,
//             otherInfo: 'Member of Art Club',
//             declaration: ["I commit to following the school's rules."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 11,
//             role: 'STUDENT',
//             firstName: 'Noah',
//             lastName: 'Johnson',
//             DOB: '05-08-2003',
//             gender: 'male',
//             email: 'noah@exale.com',
//             contact: '0123426784',
//             address: '456 Oak Lane',
//             suburb: 'Hometown',
//             state: 'California',
//             country: 'USA',
//             postcode: '1238',
//             image: ''
//         },
//         parentsDetails: {
//             id: 9,
//             fatherName: 'James Johnson',
//             motherName: 'Sarah Johnson',
//             parentEmail: 'james@example.com',
//             parentContact: '0123456785'
//         },
//         emergencyContact: {
//             id: 9,
//             contactPerson: 'Emily White',
//             contactNumber: '0011223348',
//             relationship: 'aunt'
//         },
//         healthInformation: {
//             id: 9,
//             medicareNumber: '8888888883',
//             ambulanceMembershipNumber: '1111',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 11,
//                     subjectRelated: 'option-3'
//                 },
//                 {
//                     id: 12,
//                     subjectRelated: 'option-4'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 11,
//                     subjectName: 'History'
//                 },
//                 {
//                     id: 12,
//                     subjectName: 'English'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 6,
//             otherInfo: 'Member of Drama Club',
//             declaration: ["I promise to adhere to the school's guidelines."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 13,
//             role: 'STUDENT',
//             firstName: 'Isabella',
//             lastName: 'Davis',
//             DOB: '08-22-2004',
//             gender: 'female',
//             email: 'isabella@exaple.com',
//             contact: '0123452785',
//             address: '123 Cedar Street',
//             suburb: 'Smalltown',
//             state: 'California',
//             country: 'USA',
//             postcode: '1239',
//             image: ''
//         },
//         parentsDetails: {
//             id: 11,
//             fatherName: 'David Davis',
//             motherName: 'Linda Davis',
//             parentEmail: 'david@example.com',
//             parentContact: '0123456786'
//         },
//         emergencyContact: {
//             id: 11,
//             contactPerson: 'Sophia Miller',
//             contactNumber: '0011223349',
//             relationship: 'cousin'
//         },
//         healthInformation: {
//             id: 11,
//             medicareNumber: '5555555525',
//             ambulanceMembershipNumber: '3333',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 13,
//                     subjectRelated: 'option-1'
//                 },
//                 {
//                     id: 14,
//                     subjectRelated: 'option-2'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 13,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 14,
//                     subjectName: 'Science'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 7,
//             otherInfo: 'Member of Debate Club',
//             declaration: ["I pledge to follow the school's rules."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 15,
//             role: 'STUDENT',
//             firstName: 'Oliver',
//             lastName: 'Robinson',
//             DOB: '02-17-2005',
//             gender: 'male',
//             email: 'olir@example.com',
//             contact: '0123426786',
//             address: '789 Elm Avenue',
//             suburb: 'Villagetown',
//             state: 'Queensland',
//             country: 'Australia',
//             postcode: '1240',
//             image: ''
//         },
//         parentsDetails: {
//             id: 13,
//             fatherName: 'Robert Robinson',
//             motherName: 'Maria Robinson',
//             parentEmail: 'robert@example.com',
//             parentContact: '0123456787'
//         },
//         emergencyContact: {
//             id: 13,
//             contactPerson: 'Sophia Miller',
//             contactNumber: '0011223350',
//             relationship: 'cousin'
//         },
//         healthInformation: {
//             id: 13,
//             medicareNumber: '7777727777',
//             ambulanceMembershipNumber: '4444',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 15,
//                     subjectRelated: 'option-5'
//                 },
//                 {
//                     id: 16,
//                     subjectRelated: 'option-6'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 15,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 16,
//                     subjectName: 'Biology'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 8,
//             otherInfo: 'Member of Art Club',
//             declaration: ["I commit to following the school's regulations."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 17,
//             role: 'STUDENT',
//             firstName: 'Mia',
//             lastName: 'Martinez',
//             DOB: '06-13-2004',
//             gender: 'female',
//             email: 'mia@example.com',
//             contact: '0123416787',
//             address: '321 Cedar Street',
//             suburb: 'Hometown',
//             state: 'California',
//             country: 'USA',
//             postcode: '1241',
//             image: ''
//         },
//         parentsDetails: {
//             id: 15,
//             fatherName: 'David Martinez',
//             motherName: 'Linda Martinez',
//             parentEmail: 'david@example.com',
//             parentContact: '0123456788'
//         },
//         emergencyContact: {
//             id: 15,
//             contactPerson: 'Noah Johnson',
//             contactNumber: '0011223351',
//             relationship: 'brother'
//         },
//         healthInformation: {
//             id: 15,
//             medicareNumber: '2888888888',
//             ambulanceMembershipNumber: '1111',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 17,
//                     subjectRelated: 'option-3'
//                 },
//                 {
//                     id: 18,
//                     subjectRelated: 'option-4'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 17,
//                     subjectName: 'History'
//                 },
//                 {
//                     id: 18,
//                     subjectName: 'English'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 9,
//             otherInfo: 'Member of Drama Club',
//             declaration: ["I promise to adhere to the school's guidelines."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 20,
//             role: 'STUDENT',
//             firstName: 'Lucas',
//             lastName: 'Garcia',
//             DOB: '03-29-2005',
//             gender: 'male',
//             email: 'lucas@example.com',
//             contact: '0123356788',
//             address: '123 Oak Lane',
//             suburb: 'Villagetown',
//             state: 'Queensland',
//             country: 'Australia',
//             postcode: '1242',
//             image: ''
//         },
//         parentsDetails: {
//             id: 18,
//             fatherName: 'Michael Garcia',
//             motherName: 'Emily Garcia',
//             parentEmail: 'michael@example.com',
//             parentContact: '0123456789'
//         },
//         emergencyContact: {
//             id: 18,
//             contactPerson: 'Sophia Davis',
//             contactNumber: '0011223352',
//             relationship: 'sister'
//         },
//         healthInformation: {
//             id: 18,
//             medicareNumber: '5555555559',
//             ambulanceMembershipNumber: '3333',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 19,
//                     subjectRelated: 'option-1'
//                 },
//                 {
//                     id: 20,
//                     subjectRelated: 'option-2'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 19,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 20,
//                     subjectName: 'Science'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 10,
//             otherInfo: 'Member of Debate Club',
//             declaration: ["I pledge to follow the school's rules."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 22,
//             role: 'STUDENT',
//             firstName: 'Harper',
//             lastName: 'Wilson',
//             DOB: '07-11-2004',
//             gender: 'female',
//             email: 'harper@example.com',
//             contact: '0123446790',
//             address: '456 Pine Street',
//             suburb: 'Cityville',
//             state: 'New York',
//             country: 'USA',
//             postcode: '1243',
//             image: ''
//         },
//         parentsDetails: {
//             id: 20,
//             fatherName: 'David Wilson',
//             motherName: 'Linda Wilson',
//             parentEmail: 'david@example.com',
//             parentContact: '0123456791'
//         },
//         emergencyContact: {
//             id: 20,
//             contactPerson: 'Sophia Davis',
//             contactNumber: '0011223353',
//             relationship: 'sister'
//         },
//         healthInformation: {
//             id: 20,
//             medicareNumber: '7773777777',
//             ambulanceMembershipNumber: '4444',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 21,
//                     subjectRelated: 'option-5'
//                 },
//                 {
//                     id: 22,
//                     subjectRelated: 'option-6'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 21,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 22,
//                     subjectName: 'Biology'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 11,
//             otherInfo: 'Member of Art Club',
//             declaration: ["I commit to following the school's regulations."]
//         }
//     },
//     {
//         personalDetails: {
//             id: 24,
//             role: 'STUDENT',
//             firstName: 'Evelyn',
//             lastName: 'Lopez',
//             DOB: '09-03-2005',
//             gender: 'female',
//             email: 'evelyn@example.com',
//             contact: '0123456791',
//             address: '789 Elm Avenue',
//             suburb: 'Smalltown',
//             state: 'California',
//             country: 'USA',
//             postcode: '1244',
//             image: ''
//         },
//         parentsDetails: {
//             id: 22,
//             fatherName: 'Michael Lopez',
//             motherName: 'Emily Lopez',
//             parentEmail: 'michael@example.com',
//             parentContact: '0123456792'
//         },
//         emergencyContact: {
//             id: 22,
//             contactPerson: 'Oliver Adams',
//             contactNumber: '0011223354',
//             relationship: 'cousin'
//         },
//         healthInformation: {
//             id: 22,
//             medicareNumber: '8888884888',
//             ambulanceMembershipNumber: '1111',
//             medicalCondition: 'None',
//             allergy: 'None'
//         },
//         subjects: {
//             subjectRelated: [
//                 {
//                     id: 23,
//                     subjectRelated: 'option-1'
//                 },
//                 {
//                     id: 24,
//                     subjectRelated: 'option-2'
//                 }
//             ],
//             subjects: [
//                 {
//                     id: 23,
//                     subjectName: 'Math'
//                 },
//                 {
//                     id: 24,
//                     subjectName: 'Science'
//                 }
//             ]
//         },
//         otherInformation: {
//             id: 12,
//             otherInfo: 'Member of Debate Club',
//             declaration: ["I pledge to follow the school's rules."]
//         }
//     }
// ];

// const prisma = new PrismaClient();

// const studentData: Prisma.StudentCreateInput;

// async function seedStudents() {
//     console.log('Start seeding students...');
//     for (const studentData of studentData) {
//       const student = await prisma.student.create({
//         data: {}
//       });
//       console.log(`Created student with id: ${student.id}`);
//     }
//     console.log('Seeding finished.');
//   }

//   seedStudents()
//     .catch((error) => {
//       console.error('Error seeding students:', error);
//     })
//     .finally(async () => {
//       await prisma.$disconnect();
//     });
