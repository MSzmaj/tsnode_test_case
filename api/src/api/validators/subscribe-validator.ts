import { Schema, checkSchema } from 'express-validator';
import bodyValidator from './body-validator';

const subscribeRequestSchema: Schema = 
{
    jobId: 
    {
        in: ['params'],
        errorMessage: 'JobId invalid',
        isUUID: true
    }
};

const subscribeRequestValidator = [...checkSchema(subscribeRequestSchema), bodyValidator.verifyBody];

export { subscribeRequestValidator };