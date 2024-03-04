const comment = require('../models/comment');
const tweet = require('../models/tweet');

async function deleteComment(req, res) {
    try {
        const { tweetId, commentId } = req.params;
        if (!tweetId || tweetId.length !== 24 || !commentId || commentId.length !== 24) {
            res.status(401).json({
                message: "Invalid Queries"
            })
        }
        else {
            const commentTweetMatch = await comment.findOne({ commentOn: tweetId, _id: commentId });
            if (!commentTweetMatch) {
                res.status(404).json({
                    message: "Looks like this is not the tweet you want to delete"
                })
            }
            else {
                const deleted = await comment.findByIdAndDelete({ _id: commentId });
                if (!deleted) {
                    res.status(404).json({
                        message: "Comment Not Found"
                    })
                }
                else {
                    const updatedTweet = await tweet.findByIdAndUpdate({ _id: tweetId }, { $pull: { tweetComments: deleted._id } });
                    if (!updatedTweet) {
                        res.status(404).json({
                            message: "Looks like this is not the tweet you want to delete"
                        })
                    }
                    else {
                        res.status(200).json({
                            message: "Replies from this tweet Removed"
                        })
                    }
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

module.exports = deleteComment;