module.exports = db => {
    db.FollowerRelation = db.define("followerRelation", {}, {
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