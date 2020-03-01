const universalFunc = require('../utils/universalFunctions');
const swaggerResponse = require('../utils/constants').swaggerDefaultResponseMessages;
const constants = require('../utils/constants');
const controllers = require('../controllers');
const Joi = require('joi');

const routes = {}
routes.signup = {
    method: 'POST',
    path: '/users/new',
    handler: function(request, h) {
        return controllers.users.createUser(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    config: {
        description: 'Create Users',
        tags: ['api', 'users'],
        auth: false,
        validate: {
            payload: {
                name: Joi.string().required(),
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
                role: Joi.string().valid([
                    constants.USER_ROLES.PATIENT,
                    constants.USER_ROLES.DOCTOR,
                    constants.USER_ROLES.ASSISTANT,
                    constants.USER_ROLES.CLINIC,
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

routes.login = {
    method: 'POST',
    path: '/users/login',
    handler: function(request, h) {
        return controllers.users.login(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    config: {
        description: 'User login',
        tags: ['api', 'users'],
        auth: false,
        validate: {
            payload: {
                email: Joi.string().email().required(),
                password: Joi.string().min(6).required(),
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

routes.logout = {
    method: 'POST',
    path: '/users/logout',
    handler: function(request, h) {
        request.payload = {};
        console.log(request.auth);
        request.payload.userDetails = request.auth.credentials.userDetails;
        return controllers.users.logout(request.payload)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    config: {
        description: 'User logout',
        tags: ['api', 'users'],
        auth: 'generalAuth',
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

routes.getUsers = {
    method: 'GET',
    path: '/users',
    handler: function(request, h) {
        return controllers.users.getUsers(request.query)
            .then(universalFunc.successHandler)
            .catch(universalFunc.errorHandler);
    },
    config: {
        description: 'Get users in the system',
        tags: ['api', 'users'],
        auth: {
            mode: 'required',
            strategy: 'generalAuth',
            payload: false,
            access: {
                scope: [
                    constants.USER_ROLES.PATIENT,
                    constants.USER_ROLES.ASSISTANT,
                    constants.USER_ROLES.CLINIC,
                    constants.USER_ROLES.DOCTOR,
                ]
            }
        },
        validate: {
            headers: universalFunc.authorizationHeaderObj,
            query: {
                role: Joi.string().valid([
                    constants.USER_ROLES.PATIENT,
                    constants.USER_ROLES.DOCTOR,
                    constants.USER_ROLES.ASSISTANT,
                    constants.USER_ROLES.CLINIC,
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
