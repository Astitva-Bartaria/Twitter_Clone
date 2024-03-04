const user = require('../models/user');
const cloudinary = require('cloudinary').v2;

async function addProfilePicture(req, res) {
    try {
        const { userID } = req;
        if (!userID || userID.length !== 24) {
            res.status(401).json({
                message: "Invalid User"
            })
        }
        else {
            if (!req.files) {
                res.status(401).json({
                    message: "Please upload an valid Image"
                })
            }
            else {
                const { userProfilePicture } = req.files;
                async function uploadProfilePic(file,folderName){
                    try {
                        const uploadedProfile = await cloudinary.uploader.upload(file,{folder:folderName});
                        await user.findByIdAndUpdate({_id:userID},{userProfilePicture:uploadedProfile.secure_url});
                        res.status(200).json({
                            message:"Profile Picture Added Successfully"
                        })
                    } catch (error) {
                        res.status(501).json({
                            message:"There was an error from our cloud-network"
                        })
                    }
                }
                uploadProfilePic(userProfilePicture.tempFilePath, process.env.FOLDER_NAME);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Sorry! There was an server-side error"
        })
    }
}

module.exports = addProfilePicture;