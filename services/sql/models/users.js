const constants = require('../../../utils/constants')

module.exports = function(sequelize, Sequelize) {
    const users = sequelize.define('users', {  
        id:{  
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true

        },
        name:{  
            type: Sequelize.STRING(255),
            allowNull: false
        },
        email:{  
            type: Sequelize.STRING(255),
            allowNull: false
        },
        password:{  
            type: Sequelize.STRING(255),
            allowNull: false
        },
        role:{  
            type:Sequelize.ENUM(Object.values(constants.USER_ROLES)),
            allowNull: false,
        },
    });

    return users;
}