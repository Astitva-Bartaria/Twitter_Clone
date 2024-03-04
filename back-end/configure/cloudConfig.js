const cloudinary = require('cloudinary').v2;
require('dotenv').config();

async function cloudConnect(){
    try {
       await cloudinary.config({
        cloud_name:process.env.CLOUD,
        api_key:process.env.CLOUD_KEY,
        api_secret:process.env.CLOUD_SECRET,
        secure:true
       })
       console.log('Connection Secured with Cloud Network');
    } catch (error) {
        console.log(error);
    }
}

module.exports = cloudConnect;