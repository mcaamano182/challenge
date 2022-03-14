//const log = require(appRoot + '/src/services/logging');
const appRoot = require('app-root-path');
const db = require("../../models");
const Tutorial = db.Tutorial;

const getTutorials = async () => {
    try {
        const response = await Tutorial.findAll();
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

const updateTutorial = async (id, data, user) => {
    try {
        const response =
            await Tutorial.save(data,
                user
            );
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

const deleteTutorial = async (id) => {
    try {
        const response =
            await Tutorial.destroy({where :{ id : id}});
        return response.data;
    } catch (err) {
        throw new Error(err);
    }
};

module.exports = {
    getTutorials,
    getTutorial,
    createTutorial,
    updateTutorial,
    deleteTutorial
};
