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
    extendCurrentTermHandler
} from '../../../controller/admin.controller/admin.administration.controller/admin.administration.controller';
import {
    changeCurrentTermNameSchema,
    createNewTermSetupSchema,
    createTermSchema,
    extendCurrentTermSchema,
    findUniqueTermSchema
} from '../../../schema/admin.dto/admin.administartion.dto/admin.administartion.dto';

const adminAdministrationtRoute = express.Router();

/*Term CRUD*/
adminAdministrationtRoute.route('/create-term').post(validate(createTermSchema), asyncErrorHandler(createTermHandler));
adminAdministrationtRoute.route('/find-all-terms').get(asyncErrorHandler(findAllTermHandler));
adminAdministrationtRoute.route('/find/term-detail/:id').get(validate(findUniqueTermSchema), asyncErrorHandler(findUniqueTermHandler));
adminAdministrationtRoute.route('/update/end-term/:id').patch(validate(findUniqueTermSchema), asyncErrorHandler(endTermHandler));
adminAdministrationtRoute.route('/delete-term/:id').delete(validate(findUniqueTermSchema), asyncErrorHandler(deleteTermHandler));
adminAdministrationtRoute.route('/update/term-name/:id').patch(validate(changeCurrentTermNameSchema), asyncErrorHandler(changeCurrentTermNameHandler));
adminAdministrationtRoute.route('/update/extend-term/:id').patch(validate(extendCurrentTermSchema), asyncErrorHandler(extendCurrentTermHandler));

/*create organization set up*/
adminAdministrationtRoute.route('/create-new-term-setup').post(validate(createNewTermSetupSchema), asyncErrorHandler(createNewTermSetupHandler));

export default adminAdministrationtRoute;
