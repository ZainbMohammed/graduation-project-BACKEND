const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText')

const verifyToken = async (req,res,next) =>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({status: httpStatusText.ERROR, Message: "Token is required"});
    }
    const token = authHeader.split(' ')[1];
    try{
        const currentUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();
    }catch(error){
        return res.status(401).json({status: httpStatusText.ERROR, Message: "Invalid token"});
    }
}
module.exports = verifyToken;