const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  if(req.method === 'OPTIONS'){  //===> this is a required adjustment needed for handling Browser behaviour that always sends out an OPTION req, before a POST req,
    return next();              //====>> now we ensure the POST request will happen, by pushing the process next at the OPTIONS req !!!!!
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization splits:(Bearer'[space]'TOKEN)//--> and it checks the token on position 2 which is [1] !
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
