const Hapi = require('hapi');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const start = async () => {
    await server.register([consoleLogging, require('inert')]);
    await server.start();
};

const consoleLogging = {
    plugin: require('good'),
    options: {
        ops: {
            interval: 1000
        },
        reporters: {
            consoleReporter: [
                {
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{ response: '*', log: '*' }]
                },
                { module: 'good-console' },
                'stdout'
            ]
        }
    }
};

server.route({
    path: '/',
    method: 'GET',
    handler: (request, h) => {
        return 'Hello, hapi!';
    }
});

server.route({
    path: '/{id}',
    method: 'GET',
    handler: (request, h) => {
        return `Product ID: ${encodeURIComponent(request.params.id)}`;
    }
});
server.route({
    path: '/todo',
    method: 'GET',
    handler: (request, h) => {
        return h.file('./index.html');
    }
});


start();