import { PaymentType } from '@prisma/client';
import {
    ChangeCurrentTermNameSchema,
    CreateNewTermSetupSchema,
    CreateTermSchema,
    ExtendCurrentTermSchema,
    FindUniqueTermSchema,
    TermSchema,
    TermSubjectsArraySchema,
    createTermSchema
} from '../../../schema/admin.dto/admin.administration.dto/admin.administration.dto';
import { customError } from '../../../utils/customError';
import { db } from '../../../utils/db.server';

export type SetupOrgDataType = {
    termName: string;
    subjects: { subject: string; fee: number; feeInterval: string; levels: string[] }[];
};

/* ORGANISTAION SET UP*/

// export const createNewTermSetup = async (setupData: CreateNewTermSetupSchema['body']) => {
//     // create new term
//     const { termName: name, startDate, endDate } = setupData;
//     const sDate = new Date(startDate);
//     const eDate = new Date(endDate);

//     const createdTerm = await db.$transaction(async () => {
//         const existingTerm = await db.term.findUnique({
//             where: {
//                 name: name
//             }
//         });

//         if (existingTerm) {
//             throw customError(`Term with this name -${existingTerm.name} already exists. Please choose another name`, 'fail', 400, true);
//         }
//         sDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistency
//         eDate.setHours(23, 59, 59, 999); // Set to one second before midnight on the day before the term ends
//         const newTerm = await db.term.create({
//             data: {
//                 name: name,
//                 startDate: sDate,
//                 endDate: eDate
//             }
//         });

//         if (!newTerm) {
//             throw customError('New term cannot be created', 'fail', 400, true);
//         }
//         for (const subject of setupData.subjects) {
//             // Handle subject creation or retrieval
//             let existingSubject = await db.subject.findUnique({
//                 where: { name: subject.subject }
//             });

//             if (!existingSubject) {
//                 existingSubject = await db.subject.create({
//                     data: { name: subject.subject }
//                 });
//             }

//             // Create TermSubject and Fee association
//             const termSubjects = await db.termSubject.create({
//                 data: {
//                     term: { connect: { id: createdTerm.id } },
//                     subject: { connect: { id: existingSubject.id } },
//                     fee: {
//                         connectOrCreate: {
//                             where: {
//                                 amount_paymentType: {
//                                     amount: subject.fee,
//                                     paymentType: subject.feeInterval === 'MONTHLY' ? 'MONTHLY' : 'TERM'
//                                 }
//                             },
//                             create: { amount: subject.fee, paymentType: subject.feeInterval === 'MONTHLY' ? 'MONTHLY' : 'TERM' }
//                         }
//                     },
//                     level: {
//                         connectOrCreate: subject.levels.map((level) => ({
//                             where: { name: level },
//                             create: { name: level }
//                         }))
//                     }
//                 },
//                 select: {
//                     subject: {
//                         select: {
//                             name: true,
//                             isActive: true,
//                             id: true
//                         }
//                     },
//                     level: {
//                         select: {
//                             name: true
//                         }
//                     },
//                     fee: {
//                         select: {
//                             amount: true,
//                             paymentType: true
//                         }
//                     },
//                     term: {
//                         select: {
//                             id: true,
//                             name: true,
//                             isPublish: true,
//                             currentTerm: true,
//                             startDate: true,
//                             endDate: true,
//                             createdAt: true,
//                             updatedAt: true
//                         }
//                     }
//                 }
//             });
//         }
//  return { termSubjects, createdTerm };;
//     });
// };

type TermType = any; // Replace with your actual term type or keep any if not defined
type TermSubjectType = any; // Replace with your actual term subject type or keep any if not defined

export const createNewTermSetup = async (setupData: CreateNewTermSetupSchema['body']) => {
    // create new term
    const { termName: name, startDate, endDate } = setupData;
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const transactionResult = await db.$transaction(async () => {
        let createdTerm: TermType; // Declaring the type for createdTerm

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

        createdTerm = await db.term.create({
            data: {
                name: name,
                startDate: sDate,
                endDate: eDate
            }
        });

        if (!createdTerm) {
            throw customError('New term cannot be created', 'fail', 400, true);
        }

        let termSubjects: TermSubjectType[] = []; // Declare termSubjects array

        for (const subject of setupData.subjects) {
            // Handle subject creation or retrieval
            let existingSubject = await db.subject.findUnique({
                where: { name: subject.subject }
            });

            if (!existingSubject) {
                existingSubject = await db.subject.create({
                    data: { name: subject.subject }
                });
            }

            const termSubject = await db.termSubject.create({
                data: {
                    term: { connect: { id: createdTerm.id } },
                    subject: { connect: { id: existingSubject.id } },
                    fee: {
                        connectOrCreate: {
                            where: {
                                amount_paymentType: {
                                    amount: subject.fee,
                                    paymentType: subject.feeInterval === 'MONTHLY' ? 'MONTHLY' : 'TERM'
                                }
                            },
                            create: { amount: subject.fee, paymentType: subject.feeInterval === 'MONTHLY' ? 'MONTHLY' : 'TERM' }
                        }
                    },
                    level: {
                        connectOrCreate: subject.levels.map((level) => ({
                            where: { name: level },
                            create: { name: level }
                        }))
                    }
                }
            });

            termSubjects.push(termSubject); // Add termSubject to the array
        }

        return { termSubjects, createdTerm };
    });
    console.log({ transactionResult });
    return transactionResult;
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
            termSubject: {
                select: {
                    subject: {
                        select: {
                            name: true,
                            isActive: true,
                            _count: true,
                            id: true
                        }
                    }
                }
            }
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
export async function findUniqueTerm(id: FindUniqueTermSchema['params']['id']) {
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
// extend current term

export async function extendCurrentTerm(id: ExtendCurrentTermSchema['params']['id'], termData: ExtendCurrentTermSchema['body']['updatedTerm']) {
    const eDate = new Date(termData.endDate);
    const currentTerm = await db.term.findUnique({
        where: {
            id: +id
        }
    });

    if (!currentTerm?.name) {
        throw customError(`Term with this name -${currentTerm?.name} does not exists`, 'fail', 400, true);
    }
    if (!currentTerm?.currentTerm) {
        throw customError(`Term with this name -${currentTerm?.name} already expired.`, 'fail', 400, true);
    }
    const startDate = new Date(currentTerm.startDate);
    if (eDate <= startDate) {
        throw customError(`The new end date must be later than the start date (${currentTerm.startDate}).`, 'fail', 400, true);
    }
    eDate.setHours(23, 59, 59, 999); // Set to one second before midnight on the day before the term ends
    const updatedTerm = await db.term.update({
        where: {
            id: +id // or use name if you're updating by term name
        },
        data: {
            endDate: eDate, // Setting the end date to now
            currentTerm: true
        },
        select: {
            id: true,
            name: true,
            currentTerm: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            updatedAt: true,
            termSubject: {
                select: {
                    subject: {
                        select: {
                            name: true,
                            isActive: true,
                            id: true
                        }
                    },
                    level: {
                        select: {
                            name: true
                        }
                    },
                    fee: {
                        select: {
                            amount: true,
                            paymentType: true
                        }
                    }
                }
            }
        }
    });
    return updatedTerm;
}

// end term
export async function endCurrentTerm(id: FindUniqueTermSchema['params']['id']) {
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
export async function changeCurrentTermName(id: ChangeCurrentTermNameSchema['params']['id'], termData: ChangeCurrentTermNameSchema['body']['updatedTerm']) {
    const { name } = termData;
    const existingTermWithGivenName = await db.term.findUnique({
        where: {
            name: name
        }
    });
    if (existingTermWithGivenName?.name) {
        throw customError(`This term name - ${name} already exists for a term`, 'fail', 404, true);
    }
    const currentTerm = await db.term.findUnique({
        where: {
            id: +id
            // currentTerm: true
        }
    });

    if (!currentTerm) {
        throw customError(`Term not found or could not be updated. Please try again later`, 'fail', 404, true);
    }

    const updatedTerm = await db.term.update({
        where: {
            id: +id // or use name if you're updating by term name
        },
        data: {
            name
        },
        select: {
            id: true,
            name: true,
            currentTerm: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            updatedAt: true,
            termSubject: {
                select: {
                    subject: {
                        select: {
                            name: true,
                            isActive: true,
                            id: true
                        }
                    },
                    level: {
                        select: {
                            name: true
                        }
                    },
                    fee: {
                        select: {
                            amount: true,
                            paymentType: true
                        }
                    }
                }
            }
        }
    });
    console.log(updatedTerm);
    return updatedTerm;
}

//delete a new term
export async function deleteTerm(id: FindUniqueTermSchema['params']['id']) {
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
export const createNewTermSetup1 = async (setupData: CreateNewTermSetupSchema['body']) => {
    // Start a transaction
    const result = await db.$transaction(async (prisma) => {
        // Create new term
        const createdTerm = await prisma.term.create({
            data: {
                name: setupData.termName,
                startDate: new Date(setupData.startDate),
                endDate: new Date(setupData.endDate)
            }
        });

        // Create subjects, fees, and levels associated with the term
        for (const subject of setupData.subjects) {
            // Handle subject creation or retrieval
            let existingSubject = await prisma.subject.findUnique({
                where: { name: subject.subject }
            });

            if (!existingSubject) {
                existingSubject = await prisma.subject.create({
                    data: { name: subject.subject }
                });
            }

            // Create TermSubject and Fee association
            await prisma.termSubject.create({
                data: {
                    term: { connect: { id: createdTerm.id } },
                    subject: { connect: { id: existingSubject.id } },
                    fee: {
                        connectOrCreate: {
                            where: {
                                amount_paymentType: {
                                    amount: subject.fee,
                                    paymentType: subject.feeInterval === 'MONTHLY' ? 'MONTHLY' : 'TERM'
                                }
                            },
                            create: { amount: subject.fee, paymentType: subject.feeInterval === 'MONTHLY' ? 'MONTHLY' : 'TERM' }
                        }
                    },
                    level: {
                        connectOrCreate: subject.levels.map((level) => ({
                            where: { name: level },
                            create: { name: level }
                        }))
                    }
                }
            });
        }

        return createdTerm;
    });

    return result;
};
