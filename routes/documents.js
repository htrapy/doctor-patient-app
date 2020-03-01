const universalFunc = require('../utils/universalFunctions');
const swaggerResponse = require('../utils/constants').swaggerDefaultResponseMessages;
const constants = require('../utils/constants');
const controllers = require('../controllers');
const Joi = require('joi');

const routes = {}
routes.getMyDocs = {
    method: 'GET',
    path: '/patients/documents',
    handler: function(request, h) {
        request.payload = {};
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.documents.getMyDocs(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Get my documents',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT,
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};

routes.newDoc = {
    method: 'PUT',
    path: '/patients/documents/upload',
    handler: function(request, h) {
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.documents.newDocuments(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Upload new document',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT
                ]
            }
        },
        payload: {
            maxBytes: constants.MAX_FILE_SIZE,
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            payload: {
                file: Joi.any().meta({swaggerType: 'file'}).required(),
                title: Joi.string().required()
            },
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};

routes.shareDocToAppointment = {
    method: 'POST',
    path: '/patients/documents/share/appointment',
    handler: function(request, h) {
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.documents.shareDocToAppointment(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Add a document to an appointment',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            payload: {
                document_id: Joi.number().required(),
                appointment_id: Joi.number().required()
            },
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};

routes.shareDocToDoctor = {
    method: 'POST',
    path: '/patients/documents/share/doctor',
    handler: function(request, h) {
        request.payload.userDetails = {}
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.documents.shareDocToDoctor(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'share a document to a doctor',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            payload: {
                document_id: Joi.number().required(),
                doctor_id: Joi.number().required()
            },
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};

routes.getSharedDoctorsDocs = {
    method: 'GET',
    path: '/patients/documents/doctors',
    handler: function(request, h) {
        request.payload = {};
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.documents.getPatientDocs(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Get documents shared by a patient to a doctor',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.DOCTOR,
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};

routes.getDocumentSharedAccess = {
    method: 'GET',
    path: '/patients/documents/shared',
    handler: function(request, h) {
        request.query.userDetails = request.auth.credentials.userDetails;
        return controllers.documents.getAllDocumentSharings(request.query)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Appointments and doctors to whom a document is shared',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            query: {
                document_id: Joi.number().required()
            },
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};

routes.deleteDocAccess = {
    method: 'DELETE',
    path: '/patients/documents/shared',
    handler: function(request, h) {
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.documents.deleteDocAccess(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Revoke document access',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            payload: {
                shared_id: Joi.number().required()
            },
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};

routes.downloadDoc = {
    method: 'GET',
    path: '/patients/documents/download',
    handler: controllers.documents.downloadDoc,
    options: {
        description: 'Download Document',
        tags: ['api', 'document'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT,
                    constants.USER_ROLES.DOCTOR
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            query: {
                document_id: Joi.number().required()
            },
            failAction: universalFunc.failActionFunction
        },
        plugins: {
            'hapi-swagger': {
                payloadType: 'form',
                responseMessages: swaggerResponse
            }
        },
    },
    
};
module.exports = Object.values(routes);
