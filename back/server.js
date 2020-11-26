import http from 'http';
import app from './app';
import env from './services/environment';
import db from './database/index';

// Create server with exported express router
const server = http.createServer(app);

server.listen(env.APP_PORT, () => {
    // Migrate database right after start server
    db.migrate().then(() => {
        console.info('Migrations completed!');
        console.info(`Listening on port ${env.APP_PORT}...`);
    }).catch((e) => {
        console.error('Error on migrating database: ', e);
        process.exit(1);
    });
});
