const Models = require('./sql/models');
const Op = Models.Sequelize.Op;
const Sequelize = Models.Sequelize;
const sequelize = Models.sequelize;
const raw = true;

const newDoc = async function (user_id, title, filename, path) {
    const data = {
        user_id,
        title,
        filename,
        path
    }
    const doc = await Models.uploaded_docs.create(data);
    return doc.dataValues;
}

const getPatientDoc = async function (user_id, document_id) {
    const where = {
        user_id,
        id: document_id
    }
    const attributes = [
        'id'
    ]
    return Models.uploaded_docs.findOne({ where, attributes, raw });
}

const shareDoc = async function (patient_id, document_id, appointment_id, clinic_id, doctor_id) {
    const data = {
        patient_id,
        document_id,
        appointment_id,
        clinic_id,
        doctor_id
    }
    const doc = await Models.shared_docs.create(data);
    return doc.dataValues;
}

const getDocumentSharings = async function (doctor_id, patient_id, document_id) {
    let filters = ``;
    let replacements = {};

    if (doctor_id) {
        filters += ` AND (sd.doctor_id = :doctor_id OR (app.doctor_id = :doctor_id and sd.doctor_id is NULL) ) `
        replacements.doctor_id = doctor_id
    }

    if (patient_id) {
        filters += ` AND sd.patient_id = :patient_id `
        replacements.patient_id = patient_id
    }

    if (document_id) {
        filters += ` AND sd.document_id = :document_id `
        replacements.document_id = document_id
    }
    return sequelize.query(`
        SELECT 
            sd.id as shared_id,
            app.title as appointment_title, app.description as appointment_description,
            ud.id as document_id, ud.title as document_title,
            us.name as patient_name,
            dc.name as doctor_name,
            cl.name as clinic_name
        FROM shared_docs sd
        LEFT JOIN appointments app ON app.id = sd.appointment_id
        INNER JOIN uploaded_docs ud ON ud.user_id = sd.patient_id and ud.id = sd.document_id
        INNER JOIN users us ON us.id = sd.patient_id
        LEFT JOIN users dc ON dc.id = sd.doctor_id
        LEFT JOIN users cl ON cl.id = sd.clinic_id
        WHERE 1 ${filters}
        GROUP BY sd.id
    `, {
        replacements,
        type: Sequelize.QueryTypes.SELECT
    });
}

const getDocs = async function (user_id, document_id) {
    const where = {}

    if (user_id) {
        where.user_id = user_id
    }

    if (document_id) {
        where.id = document_id
    }
    const attributes = [
        'id',
        'title',
        'filename',
        'path',
        'created_at'
    ]
    return Models.uploaded_docs.findAll({ where, attributes, raw });
}

const deleteAccess = async function (patient_id, id) {
    const where = {
        patient_id,
        id
    }
    return Models.shared_docs.destroy({ where });
}
module.exports = {
    newDoc,
    getPatientDoc,
    shareDoc,
    getDocs,
    getDocumentSharings,
    deleteAccess
}