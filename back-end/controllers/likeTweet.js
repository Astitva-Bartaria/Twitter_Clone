const user = require('../models/user');
const tweet = require('../models/tweet');

async function likeTweet(req,res){
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
                    message:"Invalid tweet"
                })
            }
            else{
                const alreadyLiked = await tweet.findOne({_id:tweetId,tweetLikes:userID});
                if(alreadyLiked){
                    const removeLike = await tweet.findByIdAndUpdate({_id:tweetId},{$pull:{tweetLikes:userID}});
                    if(removeLike){
                        await user.findByIdAndUpdate({_id:userID},{$pull:{likedTweets:removeLike._id}});
                        res.status(200).json({
                            message:"Removed Like"
                        })
                    }
                    else{
                        res.status(404).json({
                            message:"Cannot dislike an non-exisiting tweet"
                        })
                    }
                }
                else{
                    const liketheTweet = await tweet.findByIdAndUpdate({_id:tweetId},{$push:{tweetLikes:userID}});
                    if(liketheTweet){
                        await user.findByIdAndUpdate({_id:userID},{$push:{likedTweets:liketheTweet._id}});
                        res.status(200).json({
                            message:"Like added"
                        })
                    }
                    else{
                        res.status(404).json({
                            message:"Cannot like an non-exisiting tweet"
                        })
                    }
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

module.exports = likeTweet;