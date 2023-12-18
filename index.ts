import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import { Err } from './src/types/type';
import { config } from './src/config/config';
import log from './src/utils/logger';
import { customError } from './src/utils/customError';
import newApplicantRoute from './src/route/new.applicant.route/new.applicant.route';
import adminStudentRoute from './src/route/admin.route/admin.student.route/admin.enrolled.student.route/admin.enrolled.student.route';
import { globalErrorHandler } from './src/controller/error.controller/error.controller';
import adminAdministrationRoute from './src/route/admin.route/admin.administration.route/admin.administration.route';
import adminEnrollmentRoute from './src/route/admin.route/admin.enrollment.route/admin.enrollment.route';
import adminManageClassRoute from './src/route/admin.route/admin.administration.route/admin.manage.class.route/admin.manage.class.route';
import adminTimetableRoute from './src/route/admin.route/admin.timetable.route/admin.timetable.route';

const app = express();
app.use(cookieParser());

const origin =
    process.env.NODE_ENV === 'development'
        ? ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175']
        : ['https://SLMS.com', 'http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'];
app.use(
    cors({
        credentials: true,
        origin: origin,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        optionsSuccessStatus: 200
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// unhandled exception Error
process.on('uncaughtException', (err: Err) => {
    log.info('->>>>', err.name, err.message);
    log.info('uncaughtException! shutting down.. @ksm');

    process.exit(1);
});
app.get('/test', (req, res, next) => {
    throw new Error('internal error');
});
app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));
app.use('/api/v1/application', newApplicantRoute);
app.use('/api/v1/admin/administration', adminAdministrationRoute);
app.use('/api/v1/admin/administration/class', adminManageClassRoute);

app.use('/api/v1/admin/timetable', adminTimetableRoute);
app.use('/api/v1/admin/student', adminStudentRoute);
app.use('/api/v1/admin/applicant', adminEnrollmentRoute);

// Server frontend static assets and handle catch-all route
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/client/dist/index.html')));
    app.get('*', (req: Request, res: Response) => res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html')));
}

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    // ************** -->> resubale / or use a class customerError
    const error = customError(`cant find ${req.originalUrl}`, 'fail', 404, true);
    next(error);
});

// Global Error handler middleware
app.use(globalErrorHandler);
// server setup to listen to port

const server = app.listen(config.server.port, () => log.info(`Server Port: http://localhost:${config.server.port}`));

// unhandled promise rejection
process.on('unhandledRejection', (err: Err) => {
    log.info('->>>>', err.name, err.message);
    log.info('unhandled rejection! shutting down.. @ksm');
    console.log(err);

    server.close(() => {
        process.exit(1);
    });
});
