const express = require('express');
const route = express.Router();

//Register and login
const registerUser = require('../controllers/userRegister');
const loginUser = require('../controllers/userLogin');

//User Profile Routes
const userDetails = require('../controllers/userDetails');
const userEdit = require('../controllers/editDetails');
const profileFetcher = require('../controllers/profileFetcher');
const followUser = require('../controllers/followUser');
const profilPhoto = require('../controllers/uploadProfile');

//Tweets
const tweetAdd = require('../controllers/addTweet');
const allTweets = require('../controllers/showTweet');
const deleteTweet = require('../controllers/deleteTweet');
const likedTweets = require('../controllers/likeTweet');
const reTweet = require('../controllers/reTweet');
const tweetDetail = require('../controllers/tweetDetailed');
const addImageTweet = require('../controllers/addImageTweet');

//Comments
const commentTweet = require('../controllers/commentTweet');
const likeComment = require('../controllers/likeComment');
const deleteComment = require('../controllers/deleteComment');

//Middlwares if any
const loginCheck = require('../middlewares/isLoggedIn');

//routing the controllers
route.post('/register',registerUser);
route.post('/login',loginUser);
route.get('/details', loginCheck, userDetails);
route.post('/e',loginCheck, userEdit);
route.post('/t',loginCheck, tweetAdd, addImageTweet);
route.get('/allt',loginCheck, allTweets);
route.delete('/d/:tweetId',loginCheck, deleteTweet);
route.get('/like/:tweetId', loginCheck, likedTweets);
route.post('/comment/:tweetId', loginCheck, commentTweet);
route.get('/rt/:tweetId', loginCheck, reTweet);
route.get('/p/:userName',loginCheck, profileFetcher);
route.get('/follow/:userName', loginCheck, followUser);
route.get('/td/:tweetId', loginCheck, tweetDetail);
route.get('/lc/:commentId', loginCheck, likeComment);
route.delete('/dc/:tweetId/:commentId', loginCheck, deleteComment);
route.post('/pic', loginCheck, profilPhoto);

//exporting router
module.exports = route;