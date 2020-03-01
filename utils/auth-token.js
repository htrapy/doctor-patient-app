const jwt = require('jsonwebtoken');

const constants = require('./constants');

const generateAccessToken = function (tokenData) {
    return jwt.sign(tokenData, constants.AUTH_TOKEN_SECRET_KEY);
}

const decodeAccessToken = function (token) {
    return jwt.verify(token, constants.AUTH_TOKEN_SECRET_KEY);
}

module.exports = {
    generateAccessToken,
    decodeAccessToken
}