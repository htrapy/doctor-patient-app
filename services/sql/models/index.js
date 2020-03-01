const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const seqConfig = {
    host: config.get('MYSQL_HOST') || '127.0.0.1',
    user: config.get('MYSQL_USER') || 'root',
    password: config.get('MYSQL_PASSWORD') || '',
    database: config.get('MYSQL_DATABASE') || 'test',
    dialect: 'mysql',
    operatorsAliases: false,
    port: config.get('MYSQL_PORT') || 3306,
    define: { underscored: true },
    // logging: true,
    dialectOptions: {
        multipleStatements: true,
        decimalNumbers: true
    },
    // sync: {force: true}
}
const sequelize = new Sequelize(seqConfig.database, seqConfig.user, seqConfig.password, seqConfig);
const db = {};

fs.readdirSync(__dirname)
    .filter(function(file) {
	    return (file.indexOf('.') !== 0) && (file !== 'index.js');
    })
    .forEach(function(file) {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;