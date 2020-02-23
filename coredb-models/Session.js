const {DataTypes} = require("sequelize");

module.exports = db => {
    db.Session = db.define("session", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    //User Association
    db.User.hasMany(db.Session);
    db.Session.belongsTo(db.User);
};