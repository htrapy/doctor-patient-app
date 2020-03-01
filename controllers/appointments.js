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

    // todo: check if clinic id matches with the creator in clinic users
    // todo: check if clinic id matches with the doctor in clinic users


    // todo: check doctor, patient availability
    // create appointment
    await services.appointments.newAppointment(payload);
    return;

}

const getClinicAppointments = async function (payload) {
    // todo: check clinic user access

    return services.appointments.getAppointments(payload.clinic_id, payload.doctor_id);
} 
  
module.exports = {
    newAppointment,
    getClinicAppointments
}