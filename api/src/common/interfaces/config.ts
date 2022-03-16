import { Subscription } from "../models/subscription"

interface Config {
    database: {
    type: string,
    host: string,
    port: number,
    username: string,
    password: string,
    database: string,
    synchronize: boolean,
    logging: boolean,
    entities: Array<string>,
    migrations: Array<string>,
    cli: {
        entitiesDir: string,
        migrationsDir: string
    }
        },
    kafka: {
        clientId: string,
        brokers: Array<string>
    },
    subscriptions: Array<Subscription>
}

export { Config };