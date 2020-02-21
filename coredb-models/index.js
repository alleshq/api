module.exports = db => {
    //Define Models
    require("./User")(db);
    require("./FollowerRelation")(db);
    require("./Team")(db);
    require("./TeamMember")(db);

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

    return db;
};