const {DataTypes} = require("sequelize");

module.exports = db => {
    db.Group = db.define("group", {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
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
        private: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    }, {
        updatedAt: false
    });

    //Booster Association
    db.Group.hasMany(db.User, {
        foreignKey: "boostedGroupId",
        as: "boosters"
    });
    db.User.belongsTo(db.Group, {
        as: "boostedGroup"
    });
};