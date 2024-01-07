const express=require("express");
const router=express.Router();

const {login}=require("../controllers/login");
const {registration}=require("../controllers/registration");



router.post("/Login",login);
router.post("/Registration",registration);

module.exports=router;