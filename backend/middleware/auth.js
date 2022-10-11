const jwt = require('jsonwebtoken'); //allow to create and verify auth tokens

//authentification middleware
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];//get the token from the header
       const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN);
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};