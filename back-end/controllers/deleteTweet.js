const user = require('../models/user');
const tweet = require('../models/tweet');

async function deleteTweet(req,res){
    try {
        const {userID} = req;
        const {tweetId} = req.params;
        if(!userID || userID.length !== 24){
            res.status(401).json({
                message:"Invalid User"
            })
        }
        else{
            if(!tweetId || tweetId.length !== 24){
                res.status(401).json({
                    message:"Invalid Tweet"
                })
            }
            else{
                const deletedTweet = await tweet.findOneAndDelete({_id:tweetId,tweetBy:userID});
                if(deletedTweet){
                    await user.findByIdAndUpdate({_id:userID},{$pull:{userTweets:deletedTweet._id}});
                    res.status(200).json({
                        message:"Tweet Deleted Successfully"
                    })
                }
                else{
                    res.status(404).json({
                        message:"Cannot delete a tweet that dont exist or dont belong to u"
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Sorry! There was an server-side error"
        })
    }
}

module.exports = deleteTweet;