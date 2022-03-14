module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("tutorial", {
        title: {
            type: Sequelize.STRING,
            required : true
        },
        title: {
            type: Sequelize.STRING,
            required : true
        },
        video_url: {
            type: Sequelize.STRING,
        },
        description: {
            type: Sequelize.STRING
        },
        published_status: {
            type: Sequelize.STRING
        },
        deleted_at: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false,

        createdAt: false,

        updatedAt: false

    });
    return Tutorial;
};