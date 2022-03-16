import dotenv from 'dotenv';
import connectionOptions from  '../../app.config';

export default async () => {
    const dotenvResult = dotenv.config();
    if (dotenvResult.error) {
        throw dotenvResult.error;    
    }

    let config = connectionOptions.production;
    if (process.env.NODE_ENV === "development") {
        config = connectionOptions.development;
    }

    return config;
}