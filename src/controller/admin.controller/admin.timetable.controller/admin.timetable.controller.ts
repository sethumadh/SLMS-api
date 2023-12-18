import { NextFunction, Request, Response } from 'express';
import { createTimetable, findActiveTimetable, updateTimetable } from '../../../service/admin.service/admin.administration.service/admin.timetable.service/admin.timetable.service';
import { FindUniqueTimetableSchema, TimeTableSchema, UpdateTimeTableSchema } from '../../../schema/admin.dto/admin.timetable.dto/admin.timetable.dto';

export const createTimeTablesHandler = async (req: Request<{}, {}, TimeTableSchema['body'], {}>, res: Response, next: NextFunction) => {
    const timetableData = req.body;
    const newTimetable = await createTimetable(timetableData);
    res.status(200).json(newTimetable);
};
export const findActiveTimetableHandler = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const currentTimetable = await findActiveTimetable();
    res.status(200).json(currentTimetable);
};
export const updateTimetableHandler = async (req: Request<UpdateTimeTableSchema['params'], {}, UpdateTimeTableSchema['body'], {}>, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const timetableData = req.body.data;
    const updatedTimetable = await updateTimetable(id, timetableData);
    res.status(200).json({ updatedTimetable });
};
