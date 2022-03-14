module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            required : true
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            required : true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            required : true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required : true
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