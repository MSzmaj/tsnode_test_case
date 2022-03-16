import { container } from 'tsyringe';
import express from 'express';
import { registerControllers } from '..';
import { registerServices } from '../../application';
import { registerInfrastructure } from '../../infrastructure';
import { Config } from '../../common';
import debug from 'debug';
import { ApiTokens } from '../../contracts/symbols/api';

export default async (expressApp: express.Application, config: Config, debugLog: debug.IDebugger) => {
    container.register(ApiTokens.Logger, { useValue: debugLog });
    registerInfrastructure(container, config);
    registerServices(container, config);
    registerControllers(expressApp, container);
}