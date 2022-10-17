const jwt = require('jsonwebtoken'); //allow to create and verify auth tokens

//authentification middleware
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];//get the token from the header
       const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN);//decode token
       const userId = decodedToken.userId;//get userId from decoded token
       req.auth = {//add userId to request object to be used on different routes
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};