const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB successfully');
    } catch (error) {
        console.log('Error connecting to DB', error);
    }
}

module.exports = connectDB;