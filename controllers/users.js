const bcrypt = require('bcrypt');

const services = require('../services');
const constants = require('../utils/constants');
const authTokenManager = require('../utils/auth-token');

const encryptPassword = function (password) {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
  
const validatePassword = function (claimedPassoword, dbPassword) {
    return bcrypt.compareSync(claimedPassoword, dbPassword);
}

const createUser = async function (payload) {
    const unencryptedPassword = payload.password;
    payload.password = encryptPassword(unencryptedPassword);

    const oldUser = await services.users.findUser(payload.email);
    if (oldUser) {
        throw {
            message: constants.responseMessages.DUPLICATE_EMAIL, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    await services.users.newUser(payload);
    return;
}

const login = async function (payload) {
    const keysToFetch = [
        'id', 'email', 'role', 'password', 'name'
    ]

    const oldUser = await services.users.findUser(payload.email, keysToFetch);
    if (!oldUser) {
        throw {
            message: constants.responseMessages.INVALID_EMAIL_PASSWORD, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        };
    }

    const userClaimedPass = payload.password;
    const encryptedPassword = oldUser.password;
    const isValidPass = validatePassword(userClaimedPass, encryptedPassword);
    if (!isValidPass) {
        throw {
            message: constants.responseMessages.INVALID_EMAIL_PASSWORD, 
            status: constants.responseFlags.SHOW_ERROR_MESSAGE
        }
    }

    const session = await services.sessions.newSession(oldUser.id);

    const accessToken = authTokenManager.generateAccessToken({
        sessionId: session.id,
        userId: oldUser.id,
        role: oldUser.role
    });

    delete oldUser.password;
    oldUser.accessToken = accessToken
    return oldUser;
}

const logout  = async function (payload) {
    const sessionId = payload.userDetails.tokenData.sessionId;

    await services.sessions.updateSession(sessionId, {is_valid: false});

    return ;
}

const getUsers = async function (payload) {
    const keysToFetch = [
        'id', 'name', 'email', 'role'
    ]

    return services.users.findUsers(payload, keysToFetch);
}

module.exports = {
    createUser,
    login,
    logout,
    getUsers
}