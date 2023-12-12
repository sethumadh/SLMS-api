import { CreateClassWithSectionsSchema } from '../../../../schema/admin.dto/admin.administration.dto/admin.manage.class.dto/admin.manage.class.dto';
import { customError } from '../../../../utils/customError';
import { db } from '../../../../utils/db.server';

export const createClassWithSections = async (createClassData: CreateClassWithSectionsSchema['body']) => {
    const { termId, subjectName, levelName, sections } = createClassData.createClassData;
    console.log(termId, subjectName, levelName, sections);
    const uniqueSections = [...new Set(sections)];
    const subject = await db.subject.findUnique({
        where: { name: subjectName }
    });
    const level = await db.level.findUnique({
        where: { name: levelName }
    });

    if (!subject || !level) {
        throw customError(`Subject or level could not be found. Please try again later`, 'fail', 404, true);
    }
    // Find or create the TermSubjectLevel
    let termSubjectLevel = await db.termSubjectLevel.findUnique({
        where: {
            termId_subjectId_levelId: { termId, subjectId: subject.id, levelId: level.id }
        }
    });
    if (!termSubjectLevel) {
        termSubjectLevel = await db.termSubjectLevel.create({
            data: {
                termId,
                subjectId: subject.id,
                levelId: level.id
            }
        });
    }

    for (const sectionName of uniqueSections) {
        let section = await db.section.findUnique({
            where: {
                name: sectionName
            }
        });

        if (!section) {
            section = await db.section.create({
                data: {
                    name: sectionName,
                    termSubjectLevel: {
                        connect: { id: termSubjectLevel.id }
                    }
                }
            });
        }
        // No additional action needed for existing sections
    }
    return { message: 'Successfully created class' };
};

export const findPublishTermForManageClass = async () => {
    const publishTerm = await db.term.findFirst({
        where: {
            isPublish: true
        },
        select: {
            id: true,
            name: true,
            isPublish: true,
            currentTerm: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            updatedAt: true,
            termSubject: {
                select: {
                    id: true,
                    subject: true,
                    level: true,
                    termSubjectGroup: true
                }
            }
        }
    });

    if (!publishTerm) {
        throw customError(`Pubslished Term could not found. Please try again later`, 'fail', 404, true);
    }

    return publishTerm;
};

export const findCurrentTermForManageClass = async () => {
    const publishTerm = await db.term.findFirst({
        where: {
            currentTerm: true
        },
        select: {
            id: true,
            name: true,
            isPublish: true,
            currentTerm: true,
            startDate: true,
            endDate: true,
            createdAt: true,
            updatedAt: true,
            termSubject: {
                select: {
                    id: true,
                    subject: true,
                    level: true,
                    termSubjectGroup: true
                }
            }
        }
    });

    if (!publishTerm) {
        throw customError(`Current Term could not found. Please try again later`, 'fail', 404, true);
    }

    return publishTerm;
};

export const findSectionsForManageClass = async () => {
    const sections = await db.section.findMany({
        // include: {
        //     termSubjectLevels: true // Assuming you want to include related termSubjectLevels
        //     // Add other relations if needed
        // }
    });
    return sections;
};
