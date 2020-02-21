const {DataTypes} = require("sequelize");

module.exports = db => {
    db.TeamMember = db.define("teamMember", {
        teamId: {
            type: DataTypes.UUID,
            references: {
                model: db.Team,
                key: "id"
            }
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: db.User,
                key: "id"
            }
        },
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
};