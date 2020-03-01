const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const seqConfig = {
    host: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'ectosense',
    dialect: 'mysql',
    operatorsAliases: false,
    port: process.env.MYSQL_PORT || 3306,
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