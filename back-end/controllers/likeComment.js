const comment = require('../models/comment');

async function likeComment(req,res){
    try {
        const {userID} = req;
        const {commentId} = req.params;
        if(!userID || userID.length !== 24){
            res.status(401).json({
                message:"Invalid User"
            })
        }
        else{
            const alreadyLikedComment = await comment.findOne({_id:commentId, commentLikes:userID});
            if(alreadyLikedComment){
                const likedComment = await comment.findByIdAndUpdate({_id:commentId},{$pull:{commentLikes:userID}});
                if(!likedComment){
                    res.status(404).json({
                        message:"Cannot like an non-existing comment"
                    })
                }
                else{
                    res.status(200).json({
                        message:"Liked Removed"
                    })
                }
            }
            else{
                const likeMyComment = await comment.findByIdAndUpdate({_id:commentId},{$push:{commentLikes:userID}});
                if(!likeMyComment){
                    res.status(404).json({
                        message:"Cannot like an non-existing comment"
                    })
                }
                else{
                    res.status(200).json({
                        message:"Liked Added"
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

module.exports = likeComment;