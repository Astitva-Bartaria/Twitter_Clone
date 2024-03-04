const tweet = require('../models/tweet');

async function tweetDetailed(req,res){
    try {
        const {tweetId} = req.params;
        if(!tweetId || tweetId.length !== 24){
            res.status(401).json({
                message:"Invalid Tweet"
            })
        }
        else{
            const tweetDet = await tweet.findById({_id:tweetId}).populate("tweetBy").populate({path:"tweetComments",populate:{path:"commentBy"}}).exec();
            if(!tweetDet){
                res.status(404).json({
                    message:"Tweet not found"
                })
            }
            else{
                res.status(200).json({
                    message:"Tweet Details",
                    tweetDetail:tweetDet
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = tweetDetailed;