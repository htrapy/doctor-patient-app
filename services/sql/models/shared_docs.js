const constants = require('../../../utils/constants');

module.exports = function(sequelize, Sequelize) {
    const sdocs = sequelize.define('shared_docs', {  
        id: {  
            type: Sequelize.BIGINT(20),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        document_id: {  
            type: Sequelize.BIGINT(20),
            allowNull: false,
            unique:'shared_uniq'
        },
        doctor_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true,
            unique:'shared_uniq'
        },
        appointment_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true,
            unique:'shared_uniq'
        },
        clinic_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        patient_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
    }, {
        indexes: [
            {
                unique: true,
                fields: ['document_id', 'doctor_id', 'appointment_id']
            }
        ]
    });

    sdocs.associate = function(models) {
        sdocs.belongsTo(models.uploaded_docs, {
            foreignKey: 'document_id'
        });

        sdocs.belongsTo(models.users, {
            foreignKey: 'doctor_id'
        });

        sdocs.belongsTo(models.appointments, {
            foreignKey: 'appointment_id'
        });

        sdocs.belongsTo(models.users, {
            foreignKey: 'clinic_id'
        });

        sdocs.belongsTo(models.users, {
            foreignKey: 'patient_id'
        });
    }

    return sdocs;
}