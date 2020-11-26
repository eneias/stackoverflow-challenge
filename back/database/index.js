import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import Umzug from 'umzug';

import databaseConfig from '../config/database';

const env = process.env.NODE_ENV || 'development';
const config = databaseConfig[env];
const basename = path.basename(__filename);

console.log('Using database config: ', config);

const db = {};
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(
        process.env[config.use_env_variable], config,
    );
} else {
    // otherwise we use the config object to initialize our sequelize
    // instance
    sequelize = new Sequelize(
        config.database, config.username, config.password, config,
    );
}

const MODELS_PATH = path.join(__dirname, 'models');
// This gathers up all the model files we have yet to create, and
// puts them onto our db object, so we can use them in the rest
// of our application
let t = fs.readdirSync(MODELS_PATH);
t = t.filter((file) => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'));

// eslint-disable-next-line
for (const file of t) {
    const model = sequelize.import(path.join(MODELS_PATH, file));
    db[model.name] = model;
}


Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

const migrationsConfig = {
    storage: 'sequelize',
    storageOptions: {
        sequelize,
    },
    migrations: {
        params: [
            sequelize.getQueryInterface(),
            Sequelize,
        ],
        path: path.join(__dirname, './migrations'),
    },
};

const migrator = new Umzug(migrationsConfig);

let callCount = 0;
const migrate = async () => {
    try {
        const res = await migrator.up({});
        console.info('All migrations run successfully!');
        console.debug('Migrations: ', res);
        return true;
    } catch (e) {
        // TODO: check if this code is always the same
        
        if (e.original.code === '3D000') { // database doesnt exists
            const createDatabaseQuery = `CREATE DATABASE "${config.database}";`;
            await new Sequelize(
                'postgres', config.username, config.password, config,
            ).query(createDatabaseQuery);
        } else {
            callCount += 1;
            if (callCount > 3) throw e;
            await migrate();
        }
        return true;
    }
};


db.migrate = migrate;
db.sequelize = sequelize;
db.Sequelize = Sequelize;


const qq = {
    ...db,
};

export default qq;
