import { z } from 'zod';
import { db } from '../../../../utils/db.server';
import { customError } from '../../../../utils/customError';

// Find all active student for the admin

export async function findActiveStudents(page: number) {
    const take = 10;
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const activeStudents = await db.student.findMany({
        where: {
            role: 'STUDENT',
            isActive: true
        },
        skip,
        take,
        select: {
            id: true,
            role: true,
            isActive: true,
            updatedAt: true,
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
            role: 'STUDENT'
        },
        _count: {
            id: true
        }
    });

    if (activeStudents.length == 0) {
        throw customError(`No students lists to show`, 'fail', 400, true);
    }
    return { activeStudents, count };
}