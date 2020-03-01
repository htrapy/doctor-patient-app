const constants = require('../../../utils/constants');

module.exports = function(sequelize, Sequelize) {
    const docs = sequelize.define('uploaded_docs', {  
        id: {  
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        path: {
            type: Sequelize.TEXT('medium'),
            allowNull: false,
        },
        title: {
            type: Sequelize.TEXT('medium'),
            allowNull: false,
        },
        filename: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        mime: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
    });

    docs.associate = function(models) {
        docs.belongsTo(models.users, {
            foreignKey: 'user_id'
        });
    }

    return docs;
}