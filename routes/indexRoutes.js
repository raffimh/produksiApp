const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndex);
router.get("/register", indexController.getRegister);
router.post("/auth/login", indexController.postLogin);
router.post("/auth/register", indexController.register);

module.exports = router;
// Path: routes/auth.js
