const {BadRequestError} = require("../domains/errors");

const validateCreateTutorialParams = (req, res, next) => {
   const tutorial = req.body;
   if(!tutorial.name || !tutorial.published_status){
       let error = new BadRequestError('invalid parameters, name and published_status are required.');
       res.status(error.code).send(error.message);
       next(error);
   }else{
       next();
   }
};

module.exports = {validateCreateTutorialParams};