const express=require('express');
const userAuth = require('../middlewares/authMiddleware');
const { getProfile, updateProfile, forgotPassword } = require('../controllers/profileController');
const router=express.Router();


router.route("/view").get(userAuth,getProfile);
router.route("/edit/:id").patch(userAuth,updateProfile);
router.route("/edit/password/:id").patch(userAuth,forgotPassword);


module.exports=router;