const mongoose = require('mongoose');

const tweet = new mongoose.Schema({
    tweetBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    tweetTime:{
        type:Date,
        default:Date.now()
    },
    tweetBody:{
        type:String,
    },
    tweetImage:{
        type:String
    },
    tweetLikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    tweetRe:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }],
    tweetComments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }]
});

module.exports = mongoose.model("tweet",tweet);