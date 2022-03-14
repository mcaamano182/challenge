//const log = require(appRoot + '/src/services/logging');
const appRoot = require('app-root-path');
const db = require("../../models");
const Users = db.User;
const RolePermissions = db.RolePermission;
const Permissions = db.Permission;


const getUsers = async () => {
        Users.findAll()
            .then(response => {
                return response;
            })
            .catch(err => {
                throw new Error(err);
            });
};

const getUser = async (id) => {
    try {
        const response = await Users.findByPk(
            id
        );
        return response;
    } catch (err) {
        throw new Error(err);
    }
};



const createUser = async (data, user) => {
    try {
        const response =
            await Users.createUser(
                data,
                user
            );

        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const updateUser = async (id, data, user) => {
    try {
        const response =
            await User.updateUser(
                id,
                data,
                user
            );
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteUser = async (id, user) => {
    try {
        const response =
            await Users.deleteUser(id, user);
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const getUserPermissions = async (role_id) => {
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
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserPermissions
};
