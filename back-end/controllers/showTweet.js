const tweet = require('../models/tweet');

async function showTweets(req, res) {
    try {
        const { userID } = req;
        if (!userID || userID.length !== 24) {
            res.status(401).json({
                message: "Invalid User"
            })
        }
        else {
            const allTweets = await tweet.find({}).populate("tweetBy");
            const userSpecTweet = await tweet.find({tweetBy:userID}).populate("tweetBy");
            res.status(200).json({
                message: "All Tweets are here",
                tweetss: allTweets,
                myTweets:userSpecTweet
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Sorry! There was an server-side error"
        })
    }
}

module.exports = showTweets;