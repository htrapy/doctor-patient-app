const services = require('../services');
const tokenManager = require('../utils/auth-token');
const constants = require('../utils/constants');

const validate = async function(request, token, h) {
    try {
        const decodedToken = tokenManager.decodeAccessToken(token);
        const sessionDetails = await services.sessions.findSession(decodedToken.sessionId);
        
        if (!sessionDetails || !sessionDetails.is_valid) {
            return { isValid: false };
        }

        const userDetails = await services.users.findUserById(decodedToken.userId);
        userDetails.tokenData = decodedToken;
        const credentials = { 
            token: token, 
            userDetails,
            scope: decodedToken.role
        };

        return { isValid: true, credentials }
    } catch (err) {
        console.log(err);
        return { isValid: false };
    }
    
}

exports.name = 'auth-token-plugin';
exports.plugin = {
    pkg: require('../package.json'),
    register: async function (server, options) {
        await server.register(require('hapi-auth-bearer-token'));

        server.auth.strategy('generalAuth', 'bearer-access-token', {
            allowQueryToken: false,
            allowMultipleHeaders: true,
            accessTokenName: 'Authorization',
            validate
        });
    }
}

