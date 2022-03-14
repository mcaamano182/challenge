module.exports = function(sequelize, DataTypes) {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey : true
        },
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        timestamps: false,

        createdAt: false,

        updatedAt: false

    });

    Role.associate = function(models) {
        Role.hasMany(models.User, {
            foreignKey: {
                name: 'role_id',
                allowNull: true
            },
            as: 'users'
        });
        Role.belongsToMany(models.Permission, {
            through: 'RolePermission',
            as: 'permissions',
            foreignKey: 'role_id'
        });
    };
    return Role;
};