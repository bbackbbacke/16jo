/* .routes/index.js */
const express = require("express");
const user = require("../controller/userController");
const router = express.Router();

router.get("/", user.index);
router.get("/join",user.join);
router.get("/login", user.login);
router.post("/login",user.post_login);


module.exports = router; 