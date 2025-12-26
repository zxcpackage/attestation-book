var dbProperties = {
    database: 'attestation_book',
    username: 'root',
    password: '',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
    dbProperties.database, 
    dbProperties.username, 
    dbProperties.password,
    {
        host: dbProperties.host,
        dialect: dbProperties.dialect,
        pool: {
            max: dbProperties.pool.max,
            min: dbProperties.pool.min,
            acquire: dbProperties.pool.acquire,
            idle: dbProperties.pool.idle
        },
        define: {
            freezeTableName: true,
            timestamps: false
        },
        logging: false
    }
);



var init_models = require('../model/init-models');
var db = init_models(sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;



module.exports = db;