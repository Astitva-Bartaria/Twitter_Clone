const tweet = require('../models/tweet');
const user = require('../models/user');

async function addTweet(req, res, next) {
    try {
        const { userID } = req;
        if (!userID || userID.length !== 24) {
            res.status(401).json({
                message: "Invalid User!"
            })
        }
        else {
            if(req.files){
                next();
            }
            else{
                const {tweetBody} = req.body;
                if(!tweetBody){
                    res.status(401).json({
                        message:"Please include a caption for the tweet"
                    })
                }
                else{
                    const tweetCreated = await tweet.create({tweetBy:userID, tweetBody:tweetBody});
                    await user.findByIdAndUpdate({_id:userID},{$push:{userTweets:tweetCreated._id}});
                    res.status(200).json({
                        message:"Tweet Added Successfully"
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

module.exports = addTweet;