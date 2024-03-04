const user = require('../models/user');

async function followUser(req, res) {
    try {
        const { userID } = req;
        const { userName } = req.params;
        if (!userID || userID.length !== 24 || !userName) {
            res.status(401).json({
                message: "Invalid User"
            })
        }
        else {
            const userNameExist = await user.findOne({ userName: userName });
            if (!userNameExist) {
                res.status(404).json({
                    message: "Cannot follow a user that doesnt exist"
                })
            }
            else {
                if (userID == userNameExist._id) {
                    res.status(401).json({
                        message: "You cannot follow yourself"
                    })
                }
                else {
                    const alreadyFollow = await user.findOne({ _id: userID, userFollowing: userNameExist._id });
                    if (!alreadyFollow) {
                        await user.findByIdAndUpdate({ _id: userID }, { $push: { userFollowing: userNameExist._id } });
                        await user.findByIdAndUpdate({ _id: userNameExist._id }, { $push: { userFollower: userID } });
                        res.status(200).json({
                            message: "Following"
                        })
                    }
                    else {
                        await user.findByIdAndUpdate({ _id: userID }, { $pull: { userFollowing: userNameExist._id } });
                        await user.findByIdAndUpdate({ _id: userNameExist._id }, { $pull: { userFollower: userID } });
                        res.status(200).json({
                            message: "Unfollowed"
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

module.exports = followUser;