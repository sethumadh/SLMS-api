import express from 'express';

import validate from '../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../utils/asyncErrorHandler';
import { createNewTermHandler, deleteTermHandler, endTermHandler, findAllTermHandler, findUniqueTermHandler } from '../../../controller/admin.controller/admin.administration.controller/admin.administration.controller';
import { findUniqueTermSchema } from '../../../schema/admin.dto/admin.administartion.dto/admin.administartion.dto';

const adminAdministrationtRoute = express.Router();
/*Term CRUD*/
adminAdministrationtRoute.route('/create-term').post(asyncErrorHandler(createNewTermHandler));
adminAdministrationtRoute.route('/find-all-terms').get(asyncErrorHandler(findAllTermHandler));
adminAdministrationtRoute.route('/find/term-detail/:id').get(validate(findUniqueTermSchema), asyncErrorHandler(findUniqueTermHandler));
adminAdministrationtRoute.route('/update/end-term/:id').patch(validate(findUniqueTermSchema), asyncErrorHandler(endTermHandler));
adminAdministrationtRoute.route('/delete-term/:id').delete(validate(findUniqueTermSchema), asyncErrorHandler(deleteTermHandler));

export default adminAdministrationtRoute;
