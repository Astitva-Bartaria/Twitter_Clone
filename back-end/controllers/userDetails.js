const user = require('../models/user');

async function userDetails(req,res){
    try {
        const {userID} = req;
        if(!userID || userID.length !== 24){
            res.status(401).json({
                message:"Invalid User"
            })
        }
        else{
            const detailFor = await user.findById({_id:userID}).populate({path:"userTweets",populate:{path:"tweetBy"}});
            if(!detailFor){
                res.status(404).json({
                    message:"User Not Found"
                })
            }
            else{
                detailFor.userPassword = undefined;
                res.status(200).json({
                    message:"Data of u",
                    userDetail:detailFor
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

module.exports = userDetails;