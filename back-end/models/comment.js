const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    commentBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    commentBody:{
        type:"String",
        required:true
    },
    commentOn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"tweet"
    },
    commentLikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }]
})

module.exports = mongoose.model("comment",comment);