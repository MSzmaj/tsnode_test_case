import { Schema, checkSchema } from 'express-validator';
import bodyValidator from './body-validator';

const processEmailRequestSchema: Schema = 
{
    id: 
    {
        in: ['body'],
        errorMessage: 'Invalid ID',
        isString: true
    },
    currentProcessed:
    {
        in: ['body'],
        errorMessage: 'Invalid currently processing',
        isInt: true
    }
};

const processEmailRequestValidator = [...checkSchema(processEmailRequestSchema), bodyValidator.verifyBody];

export { processEmailRequestValidator };