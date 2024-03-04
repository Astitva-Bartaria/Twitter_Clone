const tweet = require('../models/tweet');
const user = require('../models/user');

async function reTweet(req, res) {
    try {
        const { userID } = req;
        const { tweetId } = req.params;
        if (!userID || userID.length !== 24) {
            res.status(401).json({
                message: "Invalid User"
            })
        }
        else {
            if (!tweetId || tweetId.length !== 24) {
                res.status(401).json({
                    message: "Invalid Tweet"
                })
            }
            else{
                const alreadyReTweet = await tweet.findOne({_id:tweetId, tweetRe:userID});
                if(alreadyReTweet){
                    await tweet.findByIdAndUpdate({_id:tweetId},{$pull:{tweetRe:userID}});
                    await user.findByIdAndUpdate({_id:userID},{$pull:{userTweets:tweetId}});
                    res.status(200).json({
                        message:"Removed Re-Tweet"
                    })
                }
                else{
                    await tweet.findByIdAndUpdate({_id:tweetId},{$push:{tweetRe:userID}});
                    await user.findByIdAndUpdate({_id:userID},{$push:{userTweets:tweetId}});
                    res.status(200).json({
                        message:"Added Re-Tweet"
                    })
                }
            }
        }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Sorry! There was an server-side error"
            })
        }
    }

module.exports = reTweet;