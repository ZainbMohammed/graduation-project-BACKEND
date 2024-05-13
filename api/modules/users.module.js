const mongoose = require('mongoose');
const validator = require('validator');

// the user document look like
// {
//     "userName": "asma",
//     "email": "asma@gmail.com",
//     "pssword": "asma1010",
//     "businessInfo": {
//       "name": "book store",
//       "email": "book@gmail.com",
//       "industry": "styding",
//       "phone": "01234",
//       "country": "Yemen"
//     }
//   }
const userSchema = new mongoose.Schema({
    userName: {
        type : String,
        require : true
    },
    email: {
        type : String,
        unique : true,
        require : true,
        validate : [validator.isEmail , 'field must be a valid email']
    },
    password: {
        type : String,
        require : true,
        isLength: {
          options: { min: 8 },
          errorMessage: 'Password should be at least 8 chars',
        },
    },
    businessInfo : {
        name: {
            type : String,
            require : true
        },
        email: {
            type : String,
            unique : true,
            require : true,
            validate : [validator.isEmail , 'field must be a valid email']
        },
        industry: {
            type : String,
            require : true
        },
        phone: {
            type : String,
            require : true
        },
        country: {
            type : String,
            require : true
        },
    },
    token: {
        type : String
    }
})

module.exports = mongoose.model('User',userSchema);