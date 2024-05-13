const User = require('../modules/users.module');
const bcrypt = require("bcryptjs")
// const jwt = require('jsonwebtoken');
const httpStatusText = require('../utils/httpStatusText')
const generateJWT = require('../utils/generateJWT');

const getAllUsers = async (req,res)=>{
    // get all courses from mongodb using Course model
    const users = await User.find({},{"__v":false});
    res.json({status: httpStatusText.SUCCESS ,data: {users}});
}


const register = async(req,res)=>{
    
    console.log('========= req.body ========');
    console.log(req.body);
    try{
        const {userName, email, password, businessInfo} = req.body;
        const oldUser = await User.findOne({email:email});

        if(oldUser){
            return res.status(400).json({status: httpStatusText.FAIL,Message: "User is alerady exit"});
        }

        // password hashing
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            businessInfo
        });
        
        // generate jwt token
        const token = await generateJWT({email: newUser.email, id: newUser._id});
        // console.log("token ==>",token);
        newUser.token = token;
        await newUser.save();

        return res.status(201).json({status: httpStatusText.SUCCESS,data: {users:newUser}})

    }catch(error){
        console.error('error',error)
        return res.status(400).json({status: httpStatusText.ERROR, Message: error.Message});
    }
}
const login = async (req,res)=>{
    console.log("req.body");
    console.log(req.body);
    console.log('===============')
    const {email,password} = req.body;
    console.log('Password:', password); // Check password value
    
    if(!email || !password){
        return res.status(400).json({status: httpStatusText.ERROR, Message: "email and password are both require"});
    }

    try{
        console.log('Request Body:', req.body); // Check if email and password are present in the request body
        console.log('Password:', password); // Check the value of the password variable

        const loginUser = await User.findOne({email:email});
    if(!loginUser){
        return res.status(400).json({status: httpStatusText.FAIL,Message: "User not exists"});

    }else{
        const matchedPassword = await bcrypt.compare(password,loginUser.password);
        if(matchedPassword){

            const token = await generateJWT({email: loginUser.email, id: loginUser._id});
            return res.status(200).json({status: httpStatusText.SUCCESS, Message: "Login is success",data:{token}});
        }else{
            return res.status(400).json({status: httpStatusText.ERROR, Message: "The password is wrong"});
        }
    }
    }catch(error){
        console.error('Login Error:', error);
        return res.status(500).json({ status: httpStatusText.ERROR, Message: "Internal Server Error" });
    }
}


module.exports = {
    getAllUsers,
    register,
    login
}