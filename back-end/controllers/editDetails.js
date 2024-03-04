const user = require('../models/user');

async function editUser(req,res){
    try {
        const {userID} = req;
        if(!userID || userID.length !== 24){
            res.status(401).json({
                message:"Invalid User! Please login again"
            })
        }
        else{
            const {fullName, DOB, userLocation} = req.body;
            if(!fullName || !DOB || !userLocation){
                res.status(401).json({
                    message:"All fields are neccessary"
                })
            }
            else{
                const userEdited = await user.findByIdAndUpdate({_id:userID},{fullName:fullName,DOB:DOB,userLocation:userLocation});
                if(!userEdited){
                    res.status(404).json({
                        message:"Cannot Edit an user which doesnt exist"
                    })
                }
                else{
                    res.status(200).json({
                        message:"Successfully Updated your details"
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

module.exports = editUser;