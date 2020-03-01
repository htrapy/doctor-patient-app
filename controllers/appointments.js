const services = require('../services');
const constants = require('../utils/constants');

const newAppointment = async function (payload) {
    let users = await services.users.findUsersById([payload.doctor_id, payload.patient_id], ['id' ,'role']);

    let patientProfile;
    let doctorProfile;

    for (let i = 0; i < users.length; ++i) {
        const user = users[i];

        if (payload.doctor_id == user.id) {
            doctorProfile = user;
        }

        if (payload.patient_id == user.id) {
            patientProfile = user;
        }

    }

    if (!(patientProfile && patientProfile.role == constants.USER_ROLES.PATIENT)) {
        throw {
            message: constants.responseMessages.INVALID_PATIENT, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    if (!(doctorProfile && doctorProfile.role == constants.USER_ROLES.DOCTOR)) {
        throw {
            message: constants.responseMessages.INVALID_DOCTOR, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    if (payload.userDetails.role === constants.USER_ROLES.ASSISTANT) {
        payload.assistant_id = payload.userDetails.id;
    }

    const isValidCreator = await services.clinics.getClinicUser(payload.clinic_id, payload.userDetails.id);
    if (!isValidCreator) {
        throw {
            message: constants.responseMessages.FORBIDDEN, 
            status: constants.responseFlags.FORBIDDEN
        };
    }

    const isValidDoctor = await services.clinics.getClinicUser(payload.clinic_id, payload.doctor_id);
    if (!isValidDoctor) {
        throw {
            message: constants.responseMessages.FORBIDDEN, 
            status: constants.responseFlags.FORBIDDEN
        };
    }

    await services.appointments.newAppointment(payload);
    return;

}

const getClinicAppointments = async function (payload) {
    // todo: check clinic user access
    const clinicUser = await services.clinics.getClinicUser(payload.clinic_id, payload.userDetails.id);
    if (!clinicUser) {
        throw {
            message: constants.responseMessages.FORBIDDEN, 
            status: constants.responseFlags.FORBIDDEN
        }; 
    }

    return services.appointments.getAppointments(payload.clinic_id, payload.doctor_id);
} 

const getMyAppointments = async function (payload) {
    return services.appointments.getAppointments(payload.clinic_id, payload.doctor_id, payload.userDetails.id);
} 
  
module.exports = {
    newAppointment,
    getClinicAppointments,
    getMyAppointments
}