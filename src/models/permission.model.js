module.exports = (sequelize, DataTypes) => {
    const Permission = sequelize.define('Permission', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            required : true
        },
        code: {
            type: DataTypes.STRING,
            required : true
        },
        description: {
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false,

        createdAt: false,

        updatedAt: false

    });

    Permission.associate = (models) => {
        Permission.belongsToMany(models.Role, {
            through: 'RolePermission',
            as: 'roles',
            foreignKey: 'permission_id'
        });
    };

    return Permission;
};