import { Schema, checkSchema } from 'express-validator';
import bodyValidator from './body-validator';

const factRequestSchema: Schema = 
{
    id: 
    {
        in: ['body'],
        errorMessage: 'ID invalid',
        isString: true
    },
    currentProcessed: {
        in: ['body'],
        errorMessage: 'currentProcessed invalid',
        isInt: true
    }
};

const factRequestValidator = [...checkSchema(factRequestSchema), bodyValidator.verifyBody];

export { factRequestValidator };