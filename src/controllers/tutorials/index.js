const jwt = require("jsonwebtoken")
const jwt_decode = require("jwt-decode");
const { Op } = require('sequelize');
const tutorialService = require('../../services/tutorials');
const {headers_name} = require('../../config/const')
const jwt_config = require('../../config/jwt.config')
const {deleteAllTutorialsVerb} = require('../../config/const')


const getTutorials = async (req, res, next) => {
    try {
        const queryFiltersAndSort = generateQueryFiltersAndSort(req,res);
        const response = await tutorialService.getTutorials(queryFiltersAndSort.filters, queryFiltersAndSort.sorting);
        res.send(response);
    } catch (err) {
        res.send(err);
        next(err);
    }
};

const generateQueryFiltersAndSort = function (req, res){
    const filters = {where:{[Op.and]:{}}};
    var sort = null;

    if(req.query){
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
    }

    return {filters:filters, sorting:sort}
}

const getTutorial = async (req, res, next) => {
    try {
        const response = await tutorialService.getTutorial(
            req.params.id
        );
        res.send(response);
        next();
    } catch (err) {
        res.status(err.code).send(err.message)
        next(err);
    }
};

const createTutorial = async (req, res, next) => {
    try {
        const tutorial = req.body;
        const response = await tutorialService.createTutorial(tutorial);
        res.send(response);
        next();
    } catch (err) {
        res.status(err.code).send(err.message)
        next(err);
    }
};


const updateTutorial = async (req, res, next) => {
    try {
        const id = req.params.id;
        const tutorial = req.body;
        const response = await tutorialService.updateTutorial(id, tutorial);
        res.send(response);
        next();
    } catch (err) {
        res.status(err.code).send(err.message)
        next(err);
    }
};

const deleteTutorial = async (req, res, next) => {
    try {
        const tutorial = req.params.id;
        if(tutorial === deleteAllTutorialsVerb){
            const response = await tutorialService.deleteAllTutorials();
            res.send(response);
        }else{
            const response = await tutorialService.deleteTutorial(tutorial);
            res.send(response);
        }
        next();
    } catch (err) {
        next(err);
    }
};

const deleteAllTutorials = async (req, res, next) => {
    try {
        const response = await tutorialService.deleteAllTutorials();
        res.send(response);
        next();
    } catch (err) {
        next(err);
    }
};

const generateCreateTutorialToken = async (req, res, next) => {
    try {
        const decoded = jwt_decode(req.headers[headers_name.access_token]);
        const token = jwt.sign({
            expires: Date.now(),
            id: decoded.id
        }, jwt_config.TOKEN_SECRET)
        res.send(token);
        next();
    } catch (err) {
        res.status(401).send('error processing token validation for create tutorial');
    }
};

module.exports = {
    getTutorials,
    getTutorial,
    deleteTutorial,
    deleteAllTutorials,
    createTutorial,
    updateTutorial,
    generateCreateTutorialToken
};
