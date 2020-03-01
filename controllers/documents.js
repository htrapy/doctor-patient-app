const services = require('../services');
const constants = require('../utils/constants');
const Path = require('path')
const fs = require('fs');


const newDocuments = async function (payload) {
    const title = payload.title;
    const buffer = payload.file._data;
    const dir = Path.resolve(`uploads/${payload.userDetails.id}/`);
    const path = Path.resolve(`${dir}/${Date.now()}`);
    const filename = payload.file.hapi.filename;

    if (!(fs.existsSync(dir))){
        await fs.promises.mkdir(dir, { recursive: true });
    }
    await fs.promises.writeFile(path, buffer);

    return services.documents.newDoc(payload.userDetails.id, title, filename, path);
}

const getMyDocs = async function(payload) {
    return services.documents.getDocs(payload.userDetails.id);
}

const shareDocToAppointment = async function (payload) {
    const document = await services.documents.getPatientDoc(payload.userDetails.id, payload.document_id);
    if (!document) {
        throw {
            message: constants.responseMessages.INVALID_DOCUMENT, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    // check valid appointment id
    const appointment = await services.appointments.getPatientAppointment(payload.userDetails.id, payload.appointment_id);
    if (!appointment) {
        throw {
            message: constants.responseMessages.INVALID_APPOINTMENT, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    await services.documents.shareDoc(payload.userDetails.id, payload.document_id, appointment.id, appointment.clinic_id, null);
    return;
}

const shareDocToDoctor = async function (payload) {
    const document = await services.documents.getPatientDoc(payload.userDetails.id, payload.document_id);
    if (!document) {
        throw {
            message: constants.responseMessages.INVALID_DOCUMENT, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    let doctor = await services.users.findUsersById([payload.doctor_id], ['id' ,'role']);
    doctor = doctor[0];
    if (!(doctor && doctor.role == constants.USER_ROLES.DOCTOR)) {
        throw {
            message: constants.responseMessages.INVALID_DOCTOR, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }
    await services.documents.shareDoc(payload.userDetails.id, payload.document_id, null, null, payload.doctor_id);
    return;
}

const getPatientDocs = async function(payload) {
    return services.documents.getDocumentSharings(payload.userDetails.id);
}

const getAllDocumentSharings = async function (payload) {
    return services.documents.getDocumentSharings(null, payload.userDetails.id, payload.document_id);
}

const deleteDocAccess = async function (payload) {
    await services.documents.deleteAccess(payload.userDetails.id, payload.shared_id);
    return;
}

const downloadDoc = async function (payload) {
    if (payload.userDetails.role = constants.USER_ROLES.DOCTOR) {
        const access = await services.documents.getDocumentSharings(payload.userDetails.id, null, payload.document_id);
        if (access.length == 0) {
            throw {
                message: constants.responseMessages.FORBIDDEN, 
                status: constants.responseFlags.SHOW_ERROR_MESSAGE
            };
        }
    } 

    const patient_id = (payload.userDetails.role == constants.USER_ROLES.PATIENT && payload.userDetails.id) || null;
    let document = await services.documents.getDocs(patient_id, payload.document_id);
    return document[0];
}
  
module.exports = {
    newDocuments,
    getMyDocs,
    shareDocToAppointment,
    shareDocToDoctor,
    getPatientDocs,
    getAllDocumentSharings,
    deleteDocAccess,
    downloadDoc
}