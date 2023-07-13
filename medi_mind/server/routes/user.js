const express=require('express')
const router=express.Router()
const {signup,signIn,profile,edit,imageadd }=require('../controllers/userController')


router.route("/signup").post(signup)

router.route("/signIn").post(signIn)

router.route("/profile/:token").get(profile)
router.route("/edit/:token").patch(edit)
router.route("/imageadd/:token").patch(imageadd)



router.route("/").get((req,res)=>{
    res.send("Hello Home Route")
})


module.exports=router