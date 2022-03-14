const db = require("../../models");
const Users = db.User;


const checkUserCredentials = async (req, res) => {
    try {
        const user_permissions = await RolePermissions.findAll({
            where : {
                role_id : role_id
            },
            include: [{model: db.Permission, as: 'permissions', attributes: ['code']}]
        })
        return user_permissions;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    checkUserCredentials
};
