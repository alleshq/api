const {DataTypes} = require("sequelize");

module.exports = db => {
    db.Application = db.define("application", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            allowNull: false
        },
        secret: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstParty: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        callbackUrls: {
            type: DataTypes.STRING,
            defaultValue: "[]",
            allowNull: false,
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