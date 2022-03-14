module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            required : true
        },
        name: {
            type: DataTypes.STRING,
            required : true
        },
        last_name: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,

        createdAt: false,

        updatedAt: false

    });

    User.associate = (models) => {
        User.belongsTo(models.Role, {
            foreignKey: {
                name: 'role_id',
                allowNull: true
            },
            as: 'users'
        });
    };

    return User;
};