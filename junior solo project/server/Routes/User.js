const express = require('express');
const router = express.Router();
const{getUser,getUserFriends,addRemoveFriend}=require('../controller/User');
const verifyToken=require('../middleware/middleware')

router.get('/:id',verifyToken,getUser)
router.get('/:id/friends',verifyToken,getUserFriends)
router.put('/:id/:friendId',verifyToken,addRemoveFriend)

module.exports=router;