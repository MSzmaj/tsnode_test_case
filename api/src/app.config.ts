import { Config } from "./common";

export default {
    development: {
       database: {
       type: 'mysql',
       host: 'localhost',
       port: 3306,
       username: 'root',
       password: 'password',
       database: 'email_db',
       synchronize: true,
       logging: false,
       entities: [
          "dist/infrastructure/entity-models/*.js"
       ],
       migrations: [
          'src/migrations/**/*.ts'
       ],
       cli: {
          entitiesDir: "dist/infrastructure/entity-models",
          migrationsDir: "dist/infrastructure/migration"
       }
         },
       kafka: {
         clientId: 'email-sender-api',
         brokers: ['localhost:29092']
       },
      subscriptions: [
         {
             topic: 'Processing',
             groupId: 'processing-group',
             destination: 'http://localhost:4000/emails/process'
         },
         {
             topic: 'Processing',
             groupId: 'processing-group-2',
             destination: 'http://localhost:4000/emails/update'
         },
         {
             topic: 'Processed',
             groupId: 'processed-group',
             destination:'http://localhost:4000/emails/fact'
         },
      ]
     } as Config,
    production: {
       database: {
       type: 'mysql',
       host: 'tsnode_mysql',
       port: 3306,
       username: 'root',
       password: 'password',
       database: 'email_db',
       synchronize: true,
       logging: false,
       entities: [
          "dist/infrastructure/entity-models/*.js"
       ],
       migrations: [
          'src/migrations/**/*.ts'
       ],
       cli: {
          entitiesDir: "dist/infrastructure/entity-models",
          migrationsDir: "dist/infrastructure/migration"
       }
      },
       kafka: {
         clientId: 'email-sender-api',
         brokers: ['kafka:29092']
       },
       subscriptions: [
         {
             topic: 'Processing',
             groupId: 'processing-group',
             destination: 'http://tsnode_api:4000/emails/process'
         },
         {
             topic: 'Processing',
             groupId: 'processing-group-2',
             destination: 'http://tsnode_api:4000/emails/update'
         },
         {
             topic: 'Processed',
             groupId: 'processed-group',
             destination:'http://tsnode_api:4000/email/fact'
         },
      ]
    } as Config
 }