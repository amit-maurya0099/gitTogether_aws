const express=require('express');
const { sendConnectionRequest,reviewConnectionRequest } = require('../controllers/connectionRequestController');
const userAuth = require('../middlewares/authMiddleware');
const router=express.Router();


router.route("/request/send/:status/:toUserId").post(userAuth,sendConnectionRequest)
router.route("/request/review/:status/:requestId").post(userAuth,reviewConnectionRequest)


module.exports=router;
