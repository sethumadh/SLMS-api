import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cookieParser from 'cookie-parser';
import { Err } from './src/types/type';
import { config } from './src/config/config';

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
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
    console.log('->>>>', err.name, err.message);
    console.log('uncaughtException! shutting down.. @ksm');

    process.exit(1);
});

//Routes
app.use('/', (req, res) => {
    res.send('hello');
});

// Server frontend static assets and handle catch-all route
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, '/frontend/dist/index.html')));
    app.get('*', (req: Request, res: Response) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}

// app.all('*', (req: Request, res: Response, next: NextFunction) => {
//     // ************** -->> resubale / or use a class customerError
//     const error = customError(`cant find ${req.originalUrl}`, 'fail', 404, true);
//     next(error);
// });

// app.use(globalErrorHandler);

// server setup to listen to port

const server = app.listen(config.server.port, () => console.log(`Server Port: http://localhost:${config.server.port}`));

// unhandled promise rejection
process.on('unhandledRejection', (err: Err) => {
    console.log('->>>>', err.name, err.message);
    console.log('unhandled rejection! shutting down.. @ksm');

    server.close(() => {
        process.exit(1);
    });
});
