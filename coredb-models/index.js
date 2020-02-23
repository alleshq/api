module.exports = db => {
    //Define Models
    require("./User")(db);
    require("./Session")(db);
    require("./FollowerRelation")(db);
    require("./Group")(db);
    require("./GroupMember")(db);
    require("./Team")(db);
    require("./TeamMember")(db);
    require("./Application")(db);

    return db;
};