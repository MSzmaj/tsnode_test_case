import { createConnection, ConnectionOptions } from 'typeorm';
import { Config } from '../../common';

async function createDatabaseConnection (config: Config) {
    await createConnection(config.database as ConnectionOptions)
    .then()
    .catch(error => console.log(error));
}

export { createDatabaseConnection };