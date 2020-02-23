const {DataTypes} = require("sequelize");

module.exports = db => {
    db.AuthCode = db.define("authCode", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        used: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        redirectUri: {
            type: DataTypes.STRING,
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
    db.User.hasMany(db.AuthCode);
    db.AuthCode.belongsTo(db.User);

    //Application Association
    db.Application.hasMany(db.AuthCode);
    db.AuthCode.belongsTo(db.Application);
};