const mongoose = require('mongoose');


const connectDB = async () => {
    await mongoose.connect('mongodb+srv://vaishnavi:puLVdhdUp2le6PC3@namastenode.ee38l.mongodb.net/devTinder')
}
module.exports = connectDB;