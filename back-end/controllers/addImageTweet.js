const tweet = require('../models/tweet');
const user = require('../models/user');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

async function addImageTweet(req, res) {
    try {
        const { userID } = req;
        const {tweetBody} = req.body;
        if (!userID || userID.length !== 24) {
            res.status(401).json({
                message: "Invalid User!"
            })
        }
        else {
            if(!req.files){
                res.status(404).json({
                    message:"Image Not-Found"
                })
            }
            else{
                if(!tweetBody){
                    res.status(401).json({
                        message:"Images comes with Caption either add Caption or remove image"
                    })
                }
                else{
                    const {tweetImage} = req.files;
                    async function uploadCloudinary(file,folderName){
                        try {
                            const uploadedToCloud = await cloudinary.uploader.upload(file,{folder:folderName});
                            if(!uploadedToCloud){
                                res.status(404).json({
                                    message:"The image you uploaded wasnt correct! Please try again later"
                                })
                            }
                            else{
                                const tweetWithImage = await tweet.create({tweetBy:userID,tweetBody:tweetBody,tweetImage:uploadedToCloud.secure_url});
                                await user.findByIdAndUpdate({_id:userID},{$push:{userTweets:tweetWithImage._id}});
                                res.status(200).json({
                                    message:"Tweet Added Successfully"
                                })
                            }
                        } catch (error) {
                            res.status(501).json({
                                message:"There was an error from our cloud networks or Database"
                            })
                        }
                    }
                    uploadCloudinary(tweetImage.tempFilePath, process.env.FOLDER_NAME)
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

module.exports = addImageTweet;