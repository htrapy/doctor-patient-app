const Models = require('./sql/models');
const constants = require('../utils/constants');
const Op = Models.Sequelize.Op;
const Sequelize = Models.Sequelize;
const sequelize = Models.sequelize;
const raw = true;

const newAppointment = async function (data) {
    return Models.appointments.create(data)
}

const getPatientAppointment = async function (patient_id, appointment_id) {
    const where = {
        patient_id,
        id: appointment_id
    }
    const attributes = [
        'id',
        'clinic_id'
    ]
    return Models.appointments.findOne({ where, attributes, raw });
}

const getAppointments = async function (clinic_id, doctor_id) {
    const where = {}

    if (clinic_id) {
        where.clinic_id = clinic_id
    }

    if (doctor_id) {
        where.doctor_id = doctor_id
    }
    const include = [];
    include.push(
        {
            model: Models.users,
            subQuery: false,
            as: 'patient',
            required: true,
            attributes: [
                'id',
                'name',
                'email'
            ],
            where: {
                role: constants.USER_ROLES.PATIENT
            }
        },
        {
            model: Models.users,
            subQuery: false,
            as: 'assistant',
            required: false,
            attributes: [
                'id',
                'name',
                'email'
            ],
            where: {
                role: constants.USER_ROLES.ASSISTANT
            }
        },
        {
            model: Models.users,
            subQuery: false,
            as: 'doctor',
            required: true,
            attributes: [
                'id',
                'name',
                'email'
            ],
            where: {
                role: constants.USER_ROLES.DOCTOR
            }
        }
    );

    const options = {
        where,
        include,
        // raw
    }

    return Models.appointments.findAll(options);
} 


module.exports = {
    newAppointment,
    getPatientAppointment,
    getAppointments
}