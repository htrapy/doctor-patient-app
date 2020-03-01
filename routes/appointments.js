const universalFunc = require('../utils/universalFunctions');
const swaggerResponse = require('../utils/constants').swaggerDefaultResponseMessages;
const constants = require('../utils/constants');
const controllers = require('../controllers');
const Joi = require('joi');

const routes = {}
routes.newAppointment = {
    method: 'POST',
    path: '/clinics/appointments',
    handler: function(request, h) {
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.appointments.newAppointment(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Create New Appointment',
        tags: ['api', 'appointment'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.DOCTOR,
                    constants.USER_ROLES.ASSISTANT,
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            payload: {
                patient_id: Joi.number().required(),
                doctor_id: Joi.number().required(),
                clinic_id: Joi.number().required(),
                title: Joi.string().max(50).required(),
                description: Joi.string().optional().default(null),
                scheduled_datetime: Joi.date().raw().required(),
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

routes.getAppointments = {
    method: 'GET',
    path: '/clinics/appointments',
    handler: function(request, h) {
        if (!request.query) {
            request.query = {};
        }
        request.query.userDetails = request.auth.credentials.userDetails;
        return controllers.appointments.getClinicAppointments(request.query)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    config: {
        description: 'Get appointments',
        tags: ['api', 'clinic', 'appointments'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.DOCTOR,
                    constants.USER_ROLES.ASSISTANT,
                    constants.USER_ROLES.CLINIC,
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            query: {
                doctor_id: Joi.number().optional(),
                clinic_id: Joi.number().required()
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

routes.getMyAppointments = {
    method: 'GET',
    path: '/patients/appointments',
    handler: function(request, h) {
        if (!request.query) {
            request.query = {};
        }
        request.query.userDetails = request.auth.credentials.userDetails;
        return controllers.appointments.getMyAppointments(request.query)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    config: {
        description: 'Get my appointments',
        tags: ['api', 'clinic', 'appointments'],
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
            query: {
                doctor_id: Joi.number().optional(),
                clinic_id: Joi.number().optional()
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
