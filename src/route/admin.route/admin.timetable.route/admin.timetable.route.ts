import express from 'express';

import validate from '../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import { createTimeTablesHandler,findActiveTimetableHandler, updateTimetableHandler } from '../../../controller/admin.controller/admin.timetable.controller/admin.timetable.controller';
import { findUniqueTimetableSchema, timeTableSchema, updateTimeTableSchema } from '../../../schema/admin.dto/admin.timetable.dto/admin.timetable.dto';

const adminTimetableRoute = express.Router();

adminTimetableRoute.route('/create-new-timetable').post(validate(timeTableSchema), asyncErrorHandler(createTimeTablesHandler));
adminTimetableRoute.route('/update-timetable/:id').put(validate(updateTimeTableSchema), asyncErrorHandler(updateTimetableHandler));
adminTimetableRoute.route('/find-active-timetable').get(asyncErrorHandler(findActiveTimetableHandler));
export default adminTimetableRoute;
