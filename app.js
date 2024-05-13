const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const dbConnection = require('./configDB/dbConnection');
const usersRouter = require('./api/routers/users.routers');
const httpStatusText = require('./api/utils/httpStatusText');

const app = express()

//config the cors
app.use(cors()); // to solve cors policy 'Cross Origin Resourse Sharing'

//config the body-parser
app.use(express.json());

//config the routes
app.use('/api/users',usersRouter);

// const url = 'mongodb://localhost:27017/musaedDB'
// const port = 3000

// connect to db
dbConnection();


// gloable middleware for not found router 
// app.all('*',(req,res,next)=>{
//     return res.json({status:httpStatusText.ERROR,Message:'This resourse is not available'});
//   })
// mongoose.connect(url,{})
// .then(result => console.log('database connected'+result))
// .catch(error => console.log('error=>'+error))

app.get('/',(req,res) =>{
    res.send('<h1>hello from node js</h1>')
})

app.get('/hi',(req,res) =>{
    res.send('<h1>hi from node js</h1>')
})


//starting the server
app.listen(3000,()=>{
    console.log('app listing on port 3000');
})