const db = require("../../models");
const Tutorial = db.Tutorial;

const getTutorials = async (filters, sort) => {
    try {
        const response = await Tutorial.findAll({where: filters.where , order: sort ? sort : null});
        return response;
    } catch (err) {
        throw new Error(err);
    }
};

const getTutorial = async (id) => {
    try {
        const response = await Tutorial.findByPk(
            id
        );
        return response;
    } catch (err) {
        throw new Error(err);
    }
};

const createTutorial = async (data) => {
    try {
        const response =
            await Tutorial.create(data);
        return response;
    } catch (err) {
        throw new Error(err);
    }
};

const updateTutorial = async (id, data) => {
    try {
        const values =  { name:data.name,
                        title:data.title,
                        video_url: data.video_url,
                        published_status: data.published_status,
                        deleted_at : data.deleted_at
        };

        const options = {where:{id:id}};

        const response =
            await Tutorial.update(values, options);

        return response;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteTutorial = async (id) => {
    try {
        const values =  {deleted_at:Date.now()};
        const options = {where:{id:id}};
        const response =
            await Tutorial.update(values, options);
        return response;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteAllTutorials = async () => {
    try {
        const values =  {deleted_at:Date.now()};
        const options = {where:{}};
        const response =
            await Tutorial.update(values, options);

        return response;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    getTutorials,
    getTutorial,
    createTutorial,
    updateTutorial,
    deleteTutorial,
    deleteAllTutorials
};
