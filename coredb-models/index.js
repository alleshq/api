module.exports = db => {
    //Define Models
    require("./User")(db);
    require("./FollowerRelation")(db);
    require("./Team")(db);
    require("./TeamMember")(db);
    
    return db;
};