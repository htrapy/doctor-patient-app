const constants = require('../../../utils/constants');

module.exports = function(sequelize, Sequelize) {
    const cusers = sequelize.define('clinic_users', {  
        clinic_id:{  
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        },
        user_id:{  
            type: Sequelize.BIGINT(20),
            primaryKey: true,
        }
    });

    cusers.associate = function(models) {
        cusers.belongsTo(models.users, {
            foreignKey: 'clinic_id'
        });

        cusers.belongsTo(models.users, {
            as: 'users',
            foreignKey: 'user_id'
        });
    }

    return cusers;
}