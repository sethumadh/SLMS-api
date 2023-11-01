import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9000;


export const config = {
    // mongo: {
    //     username: MONGO_USERNAME,
    //     password: MONGO_PASSWORD,
    //     url: MONGO_URL
    // },
    server: {
        port: SERVER_PORT
    }
};