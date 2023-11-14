import { CreateNewTermSetupSchema, CreateTermSchema } from '../../../schema/admin.dto/admin.administartion.dto/admin.administartion.dto';
import { customError } from '../../../utils/customError';
import { db } from '../../../utils/db.server';

export type SetupOrgDataType = {
    termName: string;
    subjects: { subject: string; fee: number; feeInterval: string; levels: string[] }[];
};

/* ORGANISTAION SET UP*/

export const createNewTermSetup = async (setupData: CreateNewTermSetupSchema['body']) => {
    // create new term
    // create new subject with fee and fee interval with levels
    let createdSubjects = [];

    for (const subject of setupData.subjects) {
        const existingSubject = await db.subject.findUnique({
            where: {
                name: subject.subject
            }
        });
        console.log({ existingSubject });
        if (existingSubject?.name) {
            throw customError(`${existingSubject.name} - The subject name you are trying to create already exists in the database`, 'fail', 404, true);
        }
    }

    for (const subject of setupData.subjects) {
        const newSubject = await db.subject.create({
            data: {
                name: subject.subject,
                fee: {
                    create: {
                        amount: subject.fee,
                        paymentType: subject.feeInterval === 'month' ? 'MONTHLY' : 'TERM'
                    }
                },
                SubjectLevel: {
                    create: subject.levels.map((level) => ({
                        level: {
                            connectOrCreate: {
                                where: { name: level },
                                create: { name: level }
                            }
                        },
                        fee: subject.fee,
                        paymentType: subject.feeInterval === 'month' ? 'MONTHLY' : 'TERM'
                    }))
                },
                TermSubject: {
                    create: {
                        term: {
                            connect: {
                                name: setupData.termName
                            }
                        }
                    }
                }
            }
        });
        if (!newSubject) {
            throw customError(`Unable to create new term with subjects. Please try again later`, 'fail', 404, true);
        }
        createdSubjects.push(newSubject);
    }
    return createdSubjects;
};
// const m=findAllTerm().then(res=>console.log(res))

// createNewTermSetup(setupOrgData);

/* ORGANISTAION SET UP*/
/*
Terms CRUD
// rename term(*)
// find unique one
// delete term
// list all terms
// end a term
// add enrollment only if the term is open.(*)
// create a new term
*/
/*
subjects CRUD
discontinue subjects -> make iActive flag toggle
*/
//list all terms
export async function findAllTerm() {
    const allTerms = await db.term.findMany({
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
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    if (!allTerms) {
        throw customError(`Unable to fetch terms. Please try again later`, 'fail', 404, true);
    }
    // console.log({allTerms})
    return allTerms;
}

//create a new term
export async function createNewterm(data: CreateTermSchema['body']) {
    const { name, startDate, endDate } = data;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    // Check if a term with the same name already exists
    const existingTerm = await db.term.findUnique({
        where: {
            name: name
        }
    });

    if (existingTerm) {
        throw customError(`Term with this name -${existingTerm.name} already exists. Please choose another name`, 'fail', 400, true);
    }
    sDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistency
    eDate.setHours(23, 59, 59, 999); // Set to one second before midnight on the day before the term ends

    const newTerm = await db.term.create({
        data: {
            name: name,
            startDate: sDate,
            endDate: eDate
        }
    });

    if (!newTerm) {
        throw customError('New term cannot be created', 'fail', 400, true);
    }
    return newTerm;
}

// find a unique term
export async function findUniqueTerm(id: string) {
    const uniqueTerm = await db.term.findUnique({
        where: {
            id: +id
        }
    });
    if (!uniqueTerm) {
        throw customError(`Term could not found. Please try again later`, 'fail', 404, true);
    }
    return uniqueTerm;
}

// end term
export async function endCurrentTerm(id: string) {
    const currentDate = new Date(); // Current date
    const currentTerm = await db.term.findUnique({
        where: {
            id: +id
        }
    });

    if (!currentTerm) {
        throw customError(`Term not found or could not be updated. Please try again later`, 'fail', 404, true);
    }
    if (!currentTerm?.currentTerm) {
        throw customError(`This term already expired'`, 'fail', 404, true);
    }

    const updatedTerm = await db.term.update({
        where: {
            id: +id // or use name if you're updating by term name
        },
        data: {
            endDate: currentDate, // Setting the end date to now
            currentTerm: false
        }
    });

    return updatedTerm;
}

//delete a new term
export async function deleteTerm(id: string) {
    const termExists = await db.term.findUnique({
        where: {
            id: +id
        }
    });
    if (!termExists) {
        throw customError('Term not found or could not be deleted', 'fail', 400, true);
    }
    const deletedTerm = await db.term.delete({
        where: {
            id: +id
        }
    });

    return deletedTerm;
}

/*Create organistaion set up by cretaing subject, levels and fee*/
/* Always check if the term is active*/

/* Subjects */

//discontinue a subject
// export async function discontinueSubject(subjectId: string) {
//     const updatedSubject = await db.subject.update({
//         where: { id: +subjectId },
//         data: { isActive: false }
//     });

//     return updatedSubject;
// }
