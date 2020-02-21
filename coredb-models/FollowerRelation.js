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
    
    //Follower Association
    db.User.belongsToMany(db.User, {
        as: "followers",
        through: db.FollowerRelation,
        foreignKey: "followingId",
        otherKey: "followerId"
    });
    db.User.belongsToMany(db.User, {
        as: "following",
        through: db.FollowerRelation,
        foreignKey: "followerId",
        otherKey: "followingId"
    });
};