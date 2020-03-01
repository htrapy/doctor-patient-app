const pack = require('../package');
const swaggerOptions = {
    pathPrefixSize: 2,
    schemes: ["http"],
    info: {
        title: 'test',
        version: pack.version,
    },
};

module.exports = {
    name: 'hapi-swagger',
    plugin: require('hapi-swagger'),
    options: swaggerOptions,
}
