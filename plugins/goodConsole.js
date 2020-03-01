module.exports = {
    name: 'good',
    plugin: require('@hapi/good'),
    options: {
        reporters: {
            myConsoleReporter: [
                {
                    module: '@hapi/good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        log: '*',
                        response: '*'
                    }]
                },
                {
                    module: '@hapi/good-console'
                },
                'stdout'
            ]
        }
    }
}
