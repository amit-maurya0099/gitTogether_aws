const express=require('express');
const { getConnections,getRequests,getFeedData, getConnectionById } = require('../controllers/user_controller');
const userAuth = require('../middlewares/authMiddleware');
const router=express.Router();

router.route("/connections").get(userAuth,getConnections)
router.route("/requests").get(userAuth,getRequests)
router.route("/feed").get(userAuth,getFeedData)
router.route("/connection/:id").get(userAuth,getConnectionById)



module.exports= router;