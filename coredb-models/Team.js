const {DataTypes} = require("sequelize");

module.exports = db => {
    db.Team = db.define("team", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        developer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        plan: {
            type: DataTypes.ENUM("free", "basic", "premium", "ultimate"),
            defaultValue: "free",
            allowNull: false
        }
    }, {
        timestamps: false
    });
};