module.exports = (sequelize, DataTypes) => {
    const RolePermission = sequelize.define("RolePermission", {
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        permission_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        }
    }, {
        timestamps: false,

        createdAt: false,

        updatedAt: false

    });

    RolePermission.associate = (models) => {
        RolePermission.belongsTo(models.Role, {
            foreignKey: {
                name: 'role_id',
                allowNull: true
            },
            as: 'roles'
        });
        RolePermission.belongsTo(models.Permission, {
            foreignKey: {
                name: 'permission_id',
                allowNull: true
            },
            as: 'permissions'
        });
    };

    return RolePermission;
};