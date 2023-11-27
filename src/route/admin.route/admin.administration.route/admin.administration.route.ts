import express from 'express';

import validate from '../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import {
    createTermHandler,
    createNewTermSetupHandler,
    deleteTermHandler,
    endTermHandler,
    findAllTermHandler,
    findUniqueTermHandler,
    changeCurrentTermNameHandler,
    extendCurrentTermHandler,
    findAllLevelsHandler,
    makeCurrentTermHandler,
    findAllSubjectsHandler
} from '../../../controller/admin.controller/admin.administration.controller/admin.administration.controller';
import {
    changeCurrentTermNameSchema,
    createNewTermSetupSchema,
    createTermSchema,
    extendCurrentTermSchema,
    findUniqueTermSchema
} from '../../../schema/admin.dto/admin.administration.dto/admin.administration.dto';

const adminAdministrationRoute = express.Router();

/*Term CRUD*/
adminAdministrationRoute.route('/create-term').post(validate(createTermSchema), asyncErrorHandler(createTermHandler));
adminAdministrationRoute.route('/find-all-terms').get(asyncErrorHandler(findAllTermHandler));
adminAdministrationRoute.route('/find/term-detail/:id').get(validate(findUniqueTermSchema), asyncErrorHandler(findUniqueTermHandler));
adminAdministrationRoute.route('/update/end-term/:id').patch(validate(findUniqueTermSchema), asyncErrorHandler(endTermHandler));
adminAdministrationRoute.route('/delete-term/:id').delete(validate(findUniqueTermSchema), asyncErrorHandler(deleteTermHandler));
adminAdministrationRoute.route('/update/term-name/:id').put(validate(changeCurrentTermNameSchema), asyncErrorHandler(changeCurrentTermNameHandler));
adminAdministrationRoute.route('/update/extend-term/:id').put(validate(extendCurrentTermSchema), asyncErrorHandler(extendCurrentTermHandler));

/*create organization set up*/
adminAdministrationRoute.route('/create-new-term-setup').post(validate(createNewTermSetupSchema), asyncErrorHandler(createNewTermSetupHandler));
adminAdministrationRoute.route('/update/make-current-term/:id').patch(validate(findUniqueTermSchema), asyncErrorHandler(makeCurrentTermHandler));

/*Subjects*/
adminAdministrationRoute.route('/get-all-subjects').get(asyncErrorHandler(findAllSubjectsHandler));

/* Levels*/
adminAdministrationRoute.route('/get-all-levels').get(asyncErrorHandler(findAllLevelsHandler));
export default adminAdministrationRoute;
