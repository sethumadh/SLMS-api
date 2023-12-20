import { FindUniqueTimetableSchema, TimeTableSchema, UpdateTimeTableSchema } from '../../../../schema/admin.dto/admin.timetable.dto/admin.timetable.dto';
import { customError } from '../../../../utils/customError';
import { db } from '../../../../utils/db.server';

export async function createTimetable(timetableData: TimeTableSchema['body']) {
    // Start a transaction
    const newTimetable = await db.$transaction(async (prisma) => {
        await prisma.timeTable.updateMany({
            data: { isActive: false }
        });
        const currentTermname = await db.term.findFirst({
            where: {
                currentTerm: true
            }
        });
        const newTimeTable = await prisma.timeTable.create({
            data: {
                data: timetableData.data,
                name: `${currentTermname?.name}`,
                isActive: true // Ensuring the new timetable is active
            }
        });

        return newTimeTable;
    });
    return newTimetable;
}

export async function findActiveTimetable() {
    const timetable = await db.timeTable.findFirst({
        where: { isActive: true }
    });

    if (!timetable) {
        throw customError(`There are no timetable found`, 'fail', 404, true);
    }
    return timetable;
}

export async function updateTimetable(id: UpdateTimeTableSchema['params']['id'], timetableData: UpdateTimeTableSchema['body']['data']) {
    const existingTimeTable = await db.timeTable.findUnique({
        where: {
            id: +id
        }
    });

    if (!existingTimeTable) {
        throw customError(`Timetable with ID ${id} not found`, 'fail', 404, true);
    }

    const updatedTimeTable = await db.timeTable.update({
        where: {
            id: +id
        },
        data: {
            data: timetableData
        }
    });

    return updatedTimeTable;
}
