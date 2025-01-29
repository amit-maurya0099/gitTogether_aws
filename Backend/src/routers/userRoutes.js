const express=require('express');
const { getConnections,getRequests,getFeedData } = require('../controllers/user_controller');
const userAuth = require('../middlewares/authMiddleware');
const router=express.Router();

router.route("/connections").get(userAuth,getConnections)
router.route("/requests").get(userAuth,getRequests)
router.route("/feed").get(userAuth,getFeedData)



module.exports= router;