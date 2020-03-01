const constants = require('../../../utils/constants');

module.exports = function(sequelize, Sequelize) {
    const app = sequelize.define('appointments', {  
        id:{  
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        clinic_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        doctor_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: false
        },
        assistant_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        patient_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        }, 
        title: {
            type: Sequelize.TEXT,
			allowNull: false
        },
        description: {
            type: Sequelize.TEXT('medium'),
            allowNull: true,
            defaultValue: null
        },
        scheduled_datetime: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    app.associate = function(models) {
        app.belongsTo(models.users, {
            foreignKey: 'clinic_id'
        });

        app.belongsTo(models.users, {
            as: 'doctor',
            foreignKey: 'doctor_id'
        });

        app.belongsTo(models.users, {
            as: 'assistant',
            foreignKey: 'assistant_id'
        });

        app.belongsTo(models.users, {
            as: 'patient',
            foreignKey: 'patient_id'
        });
    }

    return app;
}