module.exports = function(sequelize, Sequelize) {
    const sessions = sequelize.define('sessions', {  
        id: {  
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        user_id: {  
            type: Sequelize.BIGINT(20),
            allowNull: false,
        },
        is_valid:{
            type:Sequelize.TINYINT(1),
            allowNull:false,
            defaultValue:0
        }
    });

    return sessions;
}