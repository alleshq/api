const {DataTypes} = require("sequelize");

module.exports = db => {
    db.GroupMember = db.define("groupMember", {
        role: {
            type: DataTypes.TINYINT,
            defaultValue: 0,
            allowNull: false
        }
        // 0 - Member
        // 1 - Moderator
        // 2 - Admin (can perform actions like deleting group)
    }, {
        timestamps: false
    });

    //Group/User Association
    db.User.belongsToMany(db.Group, {
        as: "groups",
        through: db.GroupMember,
        foreignKey: "userId",
        otherKey: "groupId"
    });
    db.Group.belongsToMany(db.User, {
        as: "members",
        through: db.GroupMember,
        foreignKey: "groupId",
        otherKey: "userId"
    });
};