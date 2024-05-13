const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async () => {
    try {
      // Connect to the MongoDB cluster
      await mongoose.connect(process.env.MONGO_URL);
      console.log("Mongoose is connected successful");
    } catch (e) {
      // connection faield
      console.log("could not connect");
    }
}

module.exports = dbConnection;