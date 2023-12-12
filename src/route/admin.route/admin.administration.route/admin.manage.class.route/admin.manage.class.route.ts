import express from 'express';

import validate from '../../../../middleware/validateResource';
import { asyncErrorHandler } from '../../../../utils/asyncErrorHandler';
import {
    createClassWithSectionsHandler,
    findCurrentTermForManageClassHandler,
    findPublishTermForManageClassHandler,
    findSectionsForManageClassHandler
} from '../../../../controller/admin.controller/admin.administration.controller/admin.manage.class.controller/admin.manage.class.controller';
import { createClassWithSectionsSchema } from '../../../../schema/admin.dto/admin.administration.dto/admin.manage.class.dto/admin.manage.class.dto';

const adminManageClassRoute = express.Router();

adminManageClassRoute.route('/find-publish-term-manage-class').get(asyncErrorHandler(findPublishTermForManageClassHandler));
adminManageClassRoute.route('/find-current-term-manage-class').get(asyncErrorHandler(findCurrentTermForManageClassHandler));
adminManageClassRoute.route('/find-sections-manage-class').get(asyncErrorHandler(findSectionsForManageClassHandler));
adminManageClassRoute.route('/create-class').post(validate(createClassWithSectionsSchema), asyncErrorHandler(createClassWithSectionsHandler));

export default adminManageClassRoute;
