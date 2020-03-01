const Models = require('./sql/models');
const Op = Models.Sequelize.Op;
const Sequelize = Models.Sequelize;
const sequelize = Models.sequelize;
const raw = true;

const newSession = async function(userId) {
    const newSessionData = {
        user_id: userId,
        is_valid: true
    }
    return Models.sessions.create(newSessionData)
}

const findSession = async function(session_id, keys) {
    const where = {
        id: session_id
    }
    if (!keys) {
        keys = ['id', 'is_valid'];
    }
    return Models.sessions.findOne({ 
        where, 
        attributes: keys, 
        raw 
    });
}

const updateSession = async function(sessionId, dataToUpdate) {
    const where = {
        id: sessionId
    }

    return Models.sessions.update(dataToUpdate, { where, raw });
}

module.exports = {
    newSession,
    findSession,
    updateSession
}