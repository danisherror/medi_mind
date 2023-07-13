const express=require("express");
const { addRecord,recordview } = require("../controllers/reportController");
const router=express.Router();


router.route("/addRecord/:token").post(addRecord)
router.route("/recordview/:token").get(recordview)

module.exports=router