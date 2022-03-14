const { Op } = require('sequelize');

const db = require("../../models");
const Tutorial = db.Tutorial;

const getTutorials = async (req, res) => {

    const filters = {where:{[Op.and]:{}}};
    var sort = {};

    if(req.query.video_url){
        filters.where.video_url = {[Op.like]:'%'+req.query.video_url+"%"};
    }
    if(req.query.title){
        filters.where.title = {[Op.like]:'%'+req.query.title+'%'};
    }
    if(req.query.description){
        filters.where.description = {[Op.like]:'%'+req.query.description+'%'};
    }
    if(req.query.published_status){
        filters.where.published_status = {[Op.eq]:'%'+req.query.published_status+'%'};
    }
    if(req.query.deleted == "true"){
        filters.where.deleted_at = {[Op.ne]:null};
    }
    if(req.query.order == "asc" && req.query.order_by){
        sort = [[req.query.order_by, "ASC"]];
    }else  if(req.query.order == "desc" && req.query.order_by){
        sort = [[req.query.order_by, "DESC"]];
    }

    try {
        const response = await Tutorial.findAll({where: filters.where , order: sort});
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

        return response.data;
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
        return response.data;
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
    deleteTutorial,
    deleteAllTutorials
};
