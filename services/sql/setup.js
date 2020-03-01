const models = require('./models');
const setup = async function() {
    return models.sequelize.sync();
}
module.exports = setup;