const {DataTypes} = require("sequelize");

module.exports = db => {
    db.TeamMember = db.define("teamMember", {
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        roles: {
            type: DataTypes.STRING,
            defaultValue: "",
            get() {
                const roles = this.getDataValue("roles").split(";");
                return roles.length === 1 && roles[0].length === 0 ? [] : roles;
            },
            set(value) {
                this.setDataValue("roles", value.join(";"));
            }
        }
    }, {
        timestamps: false
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