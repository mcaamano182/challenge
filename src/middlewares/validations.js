const validateCreateTutorialParams = (req, res, next) => {
   const tutorial = req.body;
   if(!tutorial.name || !tutorial.published_status){
       res.send('invalid parameters, name and published_status are required.', 400);
   }
   next();
};

module.exports = {validateCreateTutorialParams};