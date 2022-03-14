const express = require('express');
const versionRoutes = require('express-routes-versioning')();
const fs = require("fs");


const routes = require('./src/routes');
const v1 = require('./src/routes/v1');
const v2 = require('./src/routes/v2');

const db = require("./src/models");
const sequelize = require("sequelize");

const app = express();
const initTutorialsScript = fs.readFileSync("./src/migrations/init_tutorials_db.sql").toString();
const initRolesScript = fs.readFileSync("./src/migrations/init_roles_db.sql").toString();
const initPermissionsScript = fs.readFileSync("./src/migrations/init_permissions_db.sql").toString();
const initUsersScript = fs.readFileSync("./src/migrations/init_users_db.sql").toString();
const initRolePermissionsScript = fs.readFileSync("./src/migrations/init_role-permissions_db.sql").toString();



app.get('/ping', function (req, res) {
    res.send('pong');
});

db.sequelize.sync({force: false});

/*db.sequelize.sync({ force: true }).then(() => {
    db.sequelize.query(initTutorialsScript,{type:sequelize.QueryTypes.INSERT});
    db.sequelize.query(initPermissionsScript,{type:sequelize.QueryTypes.INSERT});
    db.sequelize.query(initRolesScript,{type:sequelize.QueryTypes.INSERT});
    db.sequelize.query(initUsersScript,{type:sequelize.QueryTypes.INSERT});
    db.sequelize.query(initRolePermissionsScript,{type:sequelize.QueryTypes.INSERT});
    console.log("Drop and re-sync db.");
});*/

app.use(routes);

app.use("/api/v1/", v1);
app.use("/api/v2/", v2);

app.use("/api/", v1);
app.use("/", v1);

const server = app.listen(8080, function () {
    const port = server.address().port;
    console.log('App listening at port:%s', port);
});


module.exports = app;
