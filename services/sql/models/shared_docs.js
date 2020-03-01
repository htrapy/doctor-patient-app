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
            allowNull: false
        },
        doctor_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        appointment_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        clinic_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
        patient_id:{  
            type: Sequelize.BIGINT(20),
            allowNull: true
        },
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