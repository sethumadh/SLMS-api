import dotenv from 'dotenv';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 9000;


export const config = {
    // mysql: {
    //     username: MYSQL_USERNAME,
    //     password: MYSQL_PASSWORD,
    //     url: MYSQL_URL
    // },
    server: {
        port: SERVER_PORT
    }
};