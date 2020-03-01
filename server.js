const path = require('path');
const Hapi = require('@hapi/hapi');

process.env.NODE_CONFIG_DIR = 'config/';
process.argv.NODE_APP_INSTANCE = '';
config = require('config');

const Routes = require('./routes');
const Plugins = require('./plugins');
const sqlSetup = require('./services/sql/setup');

const start = async function () {

    try {
        const server = Hapi.server({
            port: config.get('SERVER_PORT') || 3000,
            routes: { cors: true, payload: { timeout: false } },
        });

        await server.register(Plugins);

        // register all routes
        await server.route(Routes)

        // Health Check
        server.route({
            method: 'GET',
            path: '/health',
            handler: function (request, h) {
                return 'ok';
            }
        });

        await sqlSetup();
        
        await server.start();
        console.log('Server running at:', server.info.uri);

    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();