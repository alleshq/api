const {DataTypes} = require("sequelize");

module.exports = db => {
    db.User = db.define("user", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        usesLegacyPassword: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reputation: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        rubies: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
        },
        private: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        about: {
            type: DataTypes.STRING,
            allowNull: false
        },
        plus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        updatedAt: false
    });

    //Primary/Secondary Association
    db.User.hasMany(db.User, {
        foreignKey: "primaryId",
        as: "secondaries"
    });
    db.User.belongsTo(db.User, {
        as: "primary"
    });
};