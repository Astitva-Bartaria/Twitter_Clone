const jwt = require('jsonwebtoken');
require('dotenv').config();

async function checkLogin(req, res, next) {
    try {
        if (!req.headers.authorization) {
            res.status(401).json({
                message: "Login First!"
            })
        }
        else {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                res.status(404).json({
                    message: "Oops! There was an error while authentication! Login Again"
                })
            }
            else {
                try {
                    const verified = jwt.verify(token, process.env.SECRET);
                    if (!verified){
                        res.status(404).json({
                            message: "Invalid token! Login Again"
                        })
                    }
                    else{
                        req.userID = verified.userId;
                        next();
                    }
                } catch (error) {
                    res.status(501).json({
                        message: "Invalid token! Login Again"
                    })
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

module.exports = checkLogin;