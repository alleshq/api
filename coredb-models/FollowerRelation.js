const {DataTypes} = require("sequelize");

module.exports = db => {
    db.FollowerRelation = db.define("followerRelation", {
        followerId: {
            type: DataTypes.UUID,
            references: {
                model: db.User,
                key: "id"
            }
        },
        followingId: {
            type: DataTypes.UUID,
            references: {
                model: db.User,
                key: "id"
            }
        }
    }, {
        timestamps: false
    });
};