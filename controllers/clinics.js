const services = require('../services');
const constants = require('../utils/constants');

const addUsersToClinic = async function (payload) {
    return services.clinics.newClinicUsers(payload.userDetails.id, payload.user_ids);

}
const getClinicUsers = async function (payload) {
    return services.clinics.getClinicUsers(payload.clinic_id, payload.role);
}
  
module.exports = {
    addUsersToClinic,
    getClinicUsers
}