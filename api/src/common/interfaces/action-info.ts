import { RequestHandler } from 'express';
import { HttpMethod } from '..';

export interface ActionInfo {
    route: string,
    method: HttpMethod,
    middlewares?: RequestHandler[]
}