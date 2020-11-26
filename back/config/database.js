import env from '../services/environment';
import config from './database.json'

const pool = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
};

const define = {
    timestamps: true,
    freezeTableName: true
};

export default {
    development: {
        username: env.DB_USR || config.development.username,
        password: env.DB_PWD || config.development.password,
        database: env.DB || config.development.database,
        host: env.DB_HOST || config.development.host,
        dialect: config.development.dialect,
        pool,
        define: define
    },
    test: {
        username: env.DB_USR || 'postgres',
        password: env.DB_PWD || 'postgres',
        database: env.DB || 'database_test',
        host: env.DB_HOST || '127.0.0.1',
        dialect: 'postgres',
        pool,
    },
    production: {
        username: env.DB_USR,
        password: env.DB_PWD,
        database: env.DB,
        host: env.DB_HOST,
        dialect: 'postgres',
        pool,
    },
};
