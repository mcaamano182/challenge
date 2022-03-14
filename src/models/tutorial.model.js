module.exports = (sequelize, DataTypes) => {
    const Tutorial = sequelize.define("tutorial", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            required : true
        },
        video_url: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.STRING
        },
        published_status: {
            type: DataTypes.STRING
        },
        deleted_at: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,

        createdAt: false,

        updatedAt: false

    });
    return Tutorial;
};