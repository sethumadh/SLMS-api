import { customError } from '../../../utils/customError';
import { db } from '../../../utils/db.server';
import { getNextTermName } from '../../../utils/getNextTermName';

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

//list all terms
export async function findAllTerm() {
    const allTerms = await db.term.findMany();
    if (!allTerms) {
        throw customError(`Unable to fetch terms. Please try again later`, 'fail', 404, true);
    }
    // console.log({allTerms})
    return allTerms;
}

//create a new term
export async function createNewterm() {
    const newTermName = await getNextTermName();
    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0); // Set time to 00:00:00 for consistency

    // Set endDate to 3 months from the startDate
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 3);
    endDate.setSeconds(-1); // Set to one second before midnight on the day before the term ends

    const newTerm = await db.term.create({
        data: {
            name: newTermName,
            startDate,
            endDate
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
        throw new Error('Term not found or could not be deleted');
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

