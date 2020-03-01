const Models = require('./sql/models');
const Op = Models.Sequelize.Op;
const Sequelize = Models.Sequelize;
const sequelize = Models.sequelize;
const raw = true;

const newUser = async function(payload) {
    return Models.users.create(payload)
}

const findUser = async function(email, keys) {
    const where = {
        email
    }
    if (!keys) {
        keys = ['id'];
    }
    return Models.users.findOne({ 
        where, 
        attributes: keys, 
        raw 
    });
}

const findUserById = async function(id, attributes) {
    const where = {
        id
    }

    if (!attributes) {
        attributes = ['id', 'name', 'email', 'role']
    }

    return Models.users.findOne({ 
        where, 
        attributes,
        raw 
    });
}

const findUsersById = async function(id, attributes) {
    const where = {
        id: {
            [Op.in]: id
        }
    }

    return Models.users.findAll({ 
        where, 
        attributes,
        raw 
    });
}

const findUsers = async function (find, keys = []) {
    const where = find;
    const attributes = keys;
    return Models.users.findAll({ where, attributes, raw });
}
module.exports = {
    newUser,
    findUser,
    findUserById,
    findUsersById,
    findUsers
}