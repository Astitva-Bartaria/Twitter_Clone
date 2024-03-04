const tweet = require('../models/tweet');
const comment = require('../models/comment');

async function addComment(req, res) {
    try {
        const { userID } = req;
        const { tweetId } = req.params;
        const { commentBody } = req.body;
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
            else {
                if (!commentBody) {
                    res.status(401).json({
                        message: "Please response with a message on comment"
                    })
                }
                else {
                    const tweetexist = await tweet.findById({ _id: tweetId });
                    if (!tweetexist) {
                        res.status(404).json({
                            message: "Cannot comment on tweet that doesnt exist"
                        })
                    }
                    else {
                        const commentAdded = await comment.create({ commentBy: userID, commentBody: commentBody,commentOn:tweetId });
                        await tweet.findByIdAndUpdate({_id:tweetId},{$push:{tweetComments:commentAdded._id}});
                        res.status(200).json({
                            message:"Comment Added Successfully"
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

module.exports = addComment;