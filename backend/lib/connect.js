const mongoose = require('mongoose');
require('dotenv').config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {});
        console.log("Berhasil Terhubung ke Database MongoDB");
    } catch (error) {
        console.log("Gagal Terhubung ke Database MongoDB", error.message);
    }
}

module.exports = connect;