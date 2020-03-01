const universalFunc = require('../utils/universalFunctions');
const swaggerResponse = require('../utils/constants').swaggerDefaultResponseMessages;
const constants = require('../utils/constants');
const controllers = require('../controllers');
const Joi = require('joi');

const routes = {}
routes.addToClinic = {
    method: 'POST',
    path: '/clinics/users',
    handler: function(request, h) {
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.clinics.addUsersToClinic(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    options: {
        description: 'Add assitants and doctors to clinic',
        tags: ['api', 'clinic'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.CLINIC,
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            payload: {
                user_ids: Joi.array().items(Joi.number().min(1)).min(1).required()
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

routes.getClinicUsers = {
    method: 'GET',
    path: '/clinics/users',
    handler: function(request, h) {
        return controllers.clinics.getClinicUsers(request.query)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    config: {
        description: 'Get doctors and assistants in a clinic',
        tags: ['api', 'clinic'],
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
                clinic_id: Joi.number().required(),
                role: Joi.string().valid([
                    constants.USER_ROLES.DOCTOR,
                    constants.USER_ROLES.ASSISTANT,
                ]).required(),
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
