export const createNewTermSetup = async (setupData) => {
    const { termName, startDate, endDate, groupSubjects } = setupData;

    const sDate = new Date(startDate);
    sDate.setHours(0, 0, 0, 0);
    const eDate = new Date(endDate);
    eDate.setHours(23, 59, 59, 999);

    const transactionResult = await db.$transaction(async (prisma) => {
        // Check and create term
        const existingTerm = await prisma.term.findFirst({
            where: { name: termName }
        });

        if (existingTerm) {
            throw new Error(`Term with name ${termName} already exists.`);
        }

        const createdTerm = await prisma.term.create({
            data: {
                name: termName.toLowerCase(),
                startDate: sDate,
                endDate: eDate
            }
        });

        for (const group of groupSubjects) {
            // Create or find subject group
            let subjectGroup = await prisma.subjectGroup.upsert({
                where: { groupName: group.groupName.toLowerCase() },
                update: {},
                create: { groupName: group.groupName.toLowerCase() }
            });

            // Process fee data
            const feeData = {
                amount: parseInt(group.fee),
                paymentType: group.feeInterval === "MONTHLY" ? "MONTHLY" : "TERM"
            };

            let fee = await prisma.fee.upsert({
                where: { amount_paymentType: feeData },
                update: {},
                create: feeData
            });

            // Create TermSubjectGroup with Fee
            const termSubjectGroup = await prisma.termSubjectGroup.create({
                data: {
                    termId: createdTerm.id,
                    subjectGroupId: subjectGroup.id,
                    feeId: fee.id
                }
            });

            for (const subjectData of group.subjects) {
                // Create or find subject
                let subject = await prisma.subject.upsert({
                    where: { name: subjectData.subjectName },
                    update: {},
                    create: { name: subjectData.subjectName }
                });

                // Link subject to the subject group
                await prisma.subject.update({
                    where: { id: subject.id },
                    data: {
                        subjectGroups: {
                            connect: { id: subjectGroup.id }
                        }
                    }
                });

                // Create TermSubject for each level
                for (const levelName of subjectData.levels) {
                    let level = await prisma.level.upsert({
                        where: { name: levelName },
                        update: {},
                        create: { name: levelName }
                    });

                    await prisma.termSubject.create({
                        data: {
                            termSubjectGroupId: termSubjectGroup.id,
                            subjectId: subject.id,
                            levelId: level.id
                        }
                    });
                }
            }
        }

        return createdTerm;
    });

    console.log({ transactionResult });
    return transactionResult;
};
