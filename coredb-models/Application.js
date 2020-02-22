const {DataTypes} = require("sequelize");

module.exports = db => {
    db.Application = db.define("application", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        secret: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        firstParty: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        callbackUrls: {
            type: DataTypes.STRING,
            defaultValue: "[]",
            get() {
                return JSON.parse(this.getDataValue("callbackUrls"));
            },
            set(value) {
                this.setDataValue("callbackUrls", JSON.stringify(value));
            }
        }
    });

    db.Team.hasMany(db.Application);
    db.Application.belongsTo(db.Team);
};