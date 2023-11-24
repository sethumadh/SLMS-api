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

const adminAdministrationtRoute = express.Router();

/*Term CRUD*/
adminAdministrationtRoute.route('/create-term').post(validate(createTermSchema), asyncErrorHandler(createTermHandler));
adminAdministrationtRoute.route('/find-all-terms').get(asyncErrorHandler(findAllTermHandler));
adminAdministrationtRoute.route('/find/term-detail/:id').get(validate(findUniqueTermSchema), asyncErrorHandler(findUniqueTermHandler));
adminAdministrationtRoute.route('/update/end-term/:id').patch(validate(findUniqueTermSchema), asyncErrorHandler(endTermHandler));
adminAdministrationtRoute.route('/delete-term/:id').delete(validate(findUniqueTermSchema), asyncErrorHandler(deleteTermHandler));
adminAdministrationtRoute.route('/update/term-name/:id').put(validate(changeCurrentTermNameSchema), asyncErrorHandler(changeCurrentTermNameHandler));
adminAdministrationtRoute.route('/update/extend-term/:id').put(validate(extendCurrentTermSchema), asyncErrorHandler(extendCurrentTermHandler));

/*create organization set up*/
adminAdministrationtRoute.route('/create-new-term-setup').post(validate(createNewTermSetupSchema), asyncErrorHandler(createNewTermSetupHandler));
adminAdministrationtRoute.route('/update/make-current-term/:id').patch(validate(findUniqueTermSchema), asyncErrorHandler(makeCurrentTermHandler));

/*Subjects*/
adminAdministrationtRoute.route('/get-all-subjects').get(asyncErrorHandler(findAllSubjectsHandler));

/* Levels*/
adminAdministrationtRoute.route('/get-all-levels').get(asyncErrorHandler(findAllLevelsHandler));
export default adminAdministrationtRoute;
