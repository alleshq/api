const {DataTypes} = require("sequelize");

module.exports = db => {
    db.User = db.define("user", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        usesLegacyPassword: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        name: {
            type: DataTypes.STRING
        },
        nickname: {
            type: DataTypes.STRING
        },
        reputation: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        rubies: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        private: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        about: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
        plus: {
            type: DataTypes.BOOLEAN,
            defaultValue: 0
        }
    }, {
        timestamps: false
    });
};