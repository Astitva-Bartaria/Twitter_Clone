const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function loginUser(req,res){
    try {
        const {userName, userPassword} = req.body;
        if(!userName || !userPassword){
            res.status(401).json({
                message:"All fields are neccessary"
            })
        }
        else{
            const userNameThere = await user.findOne({userName:userName});
            if(!userNameThere){
                res.status(404).json({
                    message:"User not found! Sign Up to continue"
                })
            }
            else{
                try {
                    if(await bcrypt.compare(userPassword,userNameThere.userPassword)){
                        const token = jwt.sign({
                            userId:userNameThere._id
                        },process.env.SECRET);
                        res.status(200).json({
                            message:"Welcome to twitter",
                            userToken:token,
                            userNo:userNameThere._id
                        })
                    }
                    else{
                        res.status(401).json({
                            message:"Invalid Password! Try again"
                        })
                    }
                } catch (error) {
                    res.status(501).json({
                        message:"Error while creating your token! Try again later"
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

module.exports = loginUser;