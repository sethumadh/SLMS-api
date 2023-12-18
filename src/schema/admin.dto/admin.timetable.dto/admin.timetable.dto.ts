import { z } from 'zod';

const roomSchema = z.object({
    teacherName: z.string().optional(),
    subjectName: z.string().optional()
});

const timeSlotSchema = z.object({
    name: z.string(),
    rooms: z.array(roomSchema)
});

export const timeTableSchema = z.object({
    body: z.object({
        timetable: z.array(timeSlotSchema)
    })
});

export type TimeTableSchema = z.infer<typeof timeTableSchema>;

export const updateTimeTableSchema = z.object({
    body: z.object({
        data: z.array(timeSlotSchema)
    }),
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type UpdateTimeTableSchema = z.infer<typeof updateTimeTableSchema>;

export const findUniqueTimetableSchema = z.object({
    params: z.object({
        id: z.string().min(1, { message: 'Atleast one param string value required @ksm' })
    })
});
export type FindUniqueTimetableSchema = z.infer<typeof findUniqueTimetableSchema>;
