const services = require('../services');
const constants = require('../utils/constants');

const addUsersToClinic = async function (payload) {
    const find = {
        user_ids: payload.user_ids,
        roles: [
            constants.USER_ROLES.ASSISTANT,
            constants.USER_ROLES.DOCTOR
        ]
    }
    const validUsers = await services.users.findUsers(find, ['id']);
    if (validUsers.length != payload.user_ids.length) {
        throw {
            message: constants.responseMessages.INVALID_USERS, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    return services.clinics.newClinicUsers(payload.userDetails.id, payload.user_ids);

}
const getClinicUsers = async function (payload) {
    return services.clinics.getClinicUsers(payload.clinic_id, payload.role);
}
  
module.exports = {
    addUsersToClinic,
    getClinicUsers
}