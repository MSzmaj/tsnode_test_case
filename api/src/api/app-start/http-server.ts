import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';

export default async (app: express.Application, debugLog: debug.IDebugger) => {
    const server: http.Server = http.createServer(app);
    const cname = process.env.CNAME;
    const port = process.env.PORT;
    const runningMessage = `API running at http://${cname}:${port}`;

    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({all: true})
        )
    };

    if (!process.env.DEBUG) {
        loggerOptions.meta = false;
    }

    app.use(expressWinston.logger(loggerOptions));
    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());

    server.listen(port, () => {
        debugLog('registering routes:\n');
    });

    console.log(runningMessage);
}