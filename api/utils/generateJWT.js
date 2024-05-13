require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = async(payload) => {
    try{

        const token = await jwt.sign(payload,process.env.JWT_SECRET_KEY,{
            expiresIn:"10d"
        })
        return token;
    }catch(error){
        throw new Error('Failed to generate JWT token');
    }
}