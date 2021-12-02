'use strict';

const Hapi = require('@hapi/hapi');
const Pino = require('hapi-pino');

const PluginA = {
    name: 'plugin-a',
    register(server) {
        const log = () => server.log(['error', 'plugin-a', 'operation-a'], new Error('Operation failed with error'));
        server.ext('onPreStart', log);
    }
};

const PluginB = {
    name: 'plugin-b',
    register(server) {
        const log = () => server.log(['error', 'plugin-b', 'operation-b'], new Error('Operation failed with error'));

        server.ext('onPreStart', log);
    }
};

async function run() {
    const server = Hapi.Server();

    await server.register([Pino, PluginA, PluginB]);

    return server.initialize();
}

run();