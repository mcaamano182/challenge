const {BadRequestError} = require("../domains/errors");

const validateCreateTutorialParams = (req, res, next) => {
   const tutorial = req.body;
   if(!tutorial.name || !tutorial.published_status){
       var error = new BadRequestError('invalid parameters, name and published_status are required.');
       res.send(error.message, error.code);
   }
   next();
};

module.exports = {validateCreateTutorialParams};