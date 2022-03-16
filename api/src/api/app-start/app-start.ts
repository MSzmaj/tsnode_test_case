import dependencyInjector from './dependency-injector';
import environmentLoader from './environment';
import expressLoader from './http-server';
import express from 'express';
import debug from 'debug';
import { createDatabaseConnection } from './database-context';
import { setupMapper } from './auto-mapper';
const debugLog: debug.IDebugger = debug('app');

async function appStart (): Promise<void> {
    const app: express.Application = express();
    setupMapper();
    const config = await environmentLoader();
    await createDatabaseConnection(config);
    await expressLoader(app, debugLog);
    await dependencyInjector(app, config, debugLog);   
}

export { appStart };