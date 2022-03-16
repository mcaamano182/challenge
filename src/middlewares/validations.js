const {BadRequestError} = require("../domains/errors");

const validateCreateTutorialParams = (req, res, next) => {
   const tutorial = req.body;
   if(!tutorial.name || !tutorial.published_status){
       let err = new BadRequestError('invalid parameters, name and published_status are required.');
       res.status(err.code).send({code: err.code, message: err.message})
       next(err);
   }else{
       next();
   }
};

module.exports = {validateCreateTutorialParams};