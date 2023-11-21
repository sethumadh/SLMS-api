export const createNewTermSetup = async (setupData) => {
    // Create new term
    const createdTerm = await db.term.create({
        data: {
            name: setupData.termName,
            startDate: new Date(setupData.startDate),
            endDate: new Date(setupData.endDate)
        }
    });

    for (const subject of setupData.subjects) {
        // Handle subject creation or retrieval
        let existingSubject = await db.subject.findUnique({
            where: { name: subject.subject }
        });

        if (!existingSubject) {
            existingSubject = await db.subject.create({
                data: { name: subject.subject }
            });
        }

        // Create TermSubject and Fee association
        const termSubject = await db.termSubject.create({
            data: {
                term: { connect: { id: createdTerm.id } },
                subject: { connect: { id: existingSubject.id } },
                fee: {
                    connectOrCreate: {
                        where: {
                            amount_paymentType: {
                                amount: subject.fee,
                                paymentType: subject.feeInterval
                            }
                        },
                        create: {
                            amount: subject.fee,
                            paymentType: subject.feeInterval
                        }
                    }
                },
                levels: {
                    connectOrCreate: subject.levels.map(levelName => ({
                        where: { name: levelName },
                        create: { name: levelName }
                    }))
                }
            }
        });
    }
};
