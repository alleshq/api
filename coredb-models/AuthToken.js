const {DataTypes} = require("sequelize");

module.exports = db => {
    db.AuthToken = db.define("authToken", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        access: {
            type: DataTypes.STRING,
            allowNull: false
        },
        refresh: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expired: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        scopes: {
            type: DataTypes.STRING,
            defaultValue: "[]",
            allowNull: false,
            get() {
                return JSON.parse(this.getDataValue("scopes"));
            },
            set(value) {
                this.setDataValue("scopes", JSON.stringify(value));
            }
        }
    }, {
        updatedAt: false
    });

    //User Association
    db.User.hasMany(db.AuthToken);
    db.AuthToken.belongsTo(db.User);

    //Application Association
    db.Application.hasMany(db.AuthToken);
    db.AuthToken.belongsTo(db.Application);
};