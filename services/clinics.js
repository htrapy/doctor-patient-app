const Models = require('./sql/models');
const Op = Models.Sequelize.Op;
const Sequelize = Models.Sequelize;
const sequelize = Models.sequelize;
const raw = true;

const newClinicUsers = async function(clinic_id, user_ids) {
    const data = user_ids.map(user_id => {
        return {
            clinic_id,
            user_id
        }
    })

    return Models.clinic_users.bulkCreate(data, {
        updateOnDuplicate: ['updated_at'],
    });
}

const getClinicUsers = async function(clinic_id, role) {
    const where = {
        clinic_id
    }
    const attributes = []
    const include = [];
    include.push({
        model: Models.users,
        subQuery: false,
        as: 'users',
        required: true,
        attributes: [
            'id',
            'name',
            'email'
        ],
        where: {
            role
        }
    });

    const options = {
        where,
        attributes,
        include,
        raw
    }

    return Models.clinic_users.findAll(options);
}

const getClinicUser = async function(clinic_id, user_id) {
    const where = {
        clinic_id,
        user_id
    }
    const attributes = [ 'clinic_id', 'user_id' ];

    return Models.clinic_users.findOne({
        where,
        attributes,
        raw
    });
}
module.exports = {
    newClinicUsers,
    getClinicUsers,
    getClinicUser
}