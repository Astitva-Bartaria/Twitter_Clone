const mongoose = require('mongoose');

const user = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true
    },
    DOB:{
        type:Date
    },
    userLocation:{
        type:String
    },
    userProfilePicture:{
        type:String
    },
    likedTweets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tweet"
    }],
    userTweets:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tweet"
    }],
    userFollower:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    userFollowing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
});

module.exports = mongoose.model('user',user);