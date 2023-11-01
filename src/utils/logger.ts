import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    // prettyPrint: true,   --> no longer supported.
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${dayjs().format()}"`
});

export default log;
