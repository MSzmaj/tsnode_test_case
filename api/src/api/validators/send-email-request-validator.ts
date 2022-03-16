import { Schema, checkSchema } from 'express-validator';
import bodyValidator from './body-validator';

const sendEmailRequestSchema: Schema = 
{
    numberOfEmails: 
    {
        in: ['body'],
        errorMessage: 'Number of emails must be a number',
        isInt: true
    }
};

const sendEmailRequestValidator = [...checkSchema(sendEmailRequestSchema), bodyValidator.verifyBody];

export { sendEmailRequestValidator };