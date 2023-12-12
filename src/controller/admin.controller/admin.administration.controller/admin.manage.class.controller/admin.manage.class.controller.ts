import { NextFunction, Request, Response } from 'express';
import {
    createClassWithSections,
    findCurrentTermForManageClass,
    findPublishTermForManageClass,
    findSectionsForManageClass
} from '../../../../service/admin.service/admin.administration.service/admin.manage.class.service/admin.manage.class.service';
import { CreateClassWithSectionsSchema } from '../../../../schema/admin.dto/admin.administration.dto/admin.manage.class.dto/admin.manage.class.dto';

export const findPublishTermForManageClassHandler = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const currentTerm = await findPublishTermForManageClass();
    res.status(200).json(currentTerm);
};
export const findCurrentTermForManageClassHandler = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const currentTerm = await findCurrentTermForManageClass();
    res.status(200).json(currentTerm);
};
export const findSectionsForManageClassHandler = async (req: Request<{}, {}, {}, {}>, res: Response, next: NextFunction) => {
    const sections = await findSectionsForManageClass();
    res.status(200).json(sections);
};
export const createClassWithSectionsHandler = async (req: Request<{}, {}, CreateClassWithSectionsSchema['body'], {}>, res: Response, next: NextFunction) => {
    const createClassData = req.body;
    const sections = await createClassWithSections(createClassData);
    res.status(200).json(sections);
};
