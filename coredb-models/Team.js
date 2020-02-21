const {DataTypes} = require("sequelize");

module.exports = db => {
    db.Team = db.define("team", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID
        },
        name: {
            type: DataTypes.STRING
        },
        slug: {
            type: DataTypes.STRING
        },
        verified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        developer: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        plan: {
            type: DataTypes.ENUM("free", "basic", "premium", "ultimate"),
            defaultValue: "free"
        }
    }, {
        timestamps: false
    });
};