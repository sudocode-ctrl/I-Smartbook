const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/ismartbook?directConnection=true"

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo successfully");

    })
    
}
module.exports = connectToMongo;