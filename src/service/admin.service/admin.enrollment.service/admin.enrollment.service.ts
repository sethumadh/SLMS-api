import { db } from '../../../utils/db.server';
import { customError } from '../../../utils/customError';
export async function findAllApplicants(page: number) {
    const take = 10;
    // const page = 2; // coming from request
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const applicants = await db.student.findMany({
        where: {
            role: 'APPLICANT'
        },
        skip,
        take,
        select: {
            id: true,
            role: true,
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
            createdAt: 'asc'
        }
    });
    const count = await db.student.aggregate({
        _count: {
            id: true
        }
    });

    if (applicants.length == 0) {
        throw customError(`No applicants lists to show`, 'fail', 400, true);
    }

    return { applicants, count };
}

export async function searchApplicants(search: string, page: number) {
    const take = 10;
    // const page = 2; // coming from request
    if (search.length == 0) {
        throw customError(`No Search query string available`, 'fail', 400, true);
    }
    const pageNum: number = page ?? 0;
    const skip = pageNum * take;
    const applicants = await db.student.findMany({
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
        },
        select: {
            id: true,
            role: true,
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
            createdAt: 'asc'
        }
    });

    const count = await db.student.aggregate({
        _count: {
            id: true
        }
    });

    if (applicants.length == 0) {
        throw customError(`No applicants lists to show`, 'fail', 400, true);
    }

    return { applicants, count };
}
