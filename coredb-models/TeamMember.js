const {DataTypes} = require("sequelize");

module.exports = db => {
    db.TeamMember = db.define("teamMember", {
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        roles: {
            type: DataTypes.STRING,
            defaultValue: "[]",
            allowNull: false,
            get() {
                return JSON.parse(this.getDataValue("roles"));
            },
            set(value) {
                this.setDataValue("roles", JSON.stringify(value));
            }
        }
    }, {
        updatedAt: false
    });

    //Team/User Association
    db.User.belongsToMany(db.Team, {
        as: "teams",
        through: db.TeamMember,
        foreignKey: "userId",
        otherKey: "teamId"
    });
    db.Team.belongsToMany(db.User, {
        as: "members",
        through: db.TeamMember,
        foreignKey: "teamId",
        otherKey: "userId"
    });
};