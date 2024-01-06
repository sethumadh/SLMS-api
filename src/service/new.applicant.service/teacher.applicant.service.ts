import { customError } from '../../utils/customError';
import { db } from '../../utils/db.server';

export async function findAllSubjects() {
    const subjects = await db.subject.findMany({
        select: {
            name: true,
            isActive: true
        }
    });

    return subjects;
}
