let Sequelize = require("sequelize");
let db = require('./db_config.js');

const sequelize = new Sequelize(db.database, db.user, db.password, {
    dialect: 'mysql',
    host: db.host,
    define: {version: false},
    logging: false
});

module.exports = sequelize;