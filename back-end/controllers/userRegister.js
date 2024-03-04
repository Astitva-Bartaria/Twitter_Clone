const user = require('../models/user');
const bcrypt = require('bcrypt');

async function registerUser(req,res){
    try {
        const {fullName, userEmail, userName, userPassword} = req.body;
        if(!fullName || !userEmail || !userName || !userPassword){
            res.status(401).json({
                message:"All Fields are neccessary"
            })
        }
        else{
            const alreadyEmail = await user.findOne({userEmail:userEmail});
            if(alreadyEmail){
                res.status(401).json({
                    message:"This email is already linked to an account! Use another one"
                })
            }
            else{
                const alreadyUserName = await user.findOne({userName:userName});
                if(alreadyUserName){
                    res.status(401).json({
                        message:"Existing UserName! Use another Username"
                    })
                }
                else{
                    try {
                        const hasedPass = await bcrypt.hash(userPassword,10);
                        await user.create({fullName, userEmail, userName, userPassword:hasedPass});
                        res.status(200).json({
                            message:"Welcome to twitter! Login to continue"
                        })
                    } catch (error) {
                        res.status(501).json({
                            message:"Error while securing your pasword"
                        })
                    }
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

module.exports = registerUser;