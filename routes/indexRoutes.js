const express = require("express");
const router = express.Router();
const indexController = require("../controllers/indexController");
const validateLoginForm = require("../middlewares/validateFormLogin");

router.get("/", indexController.getIndex);
router.get("/register", indexController.getRegister);
router.post("/auth/login", validateLoginForm, indexController.postLogin);
router.post("/auth/register", indexController.register);

module.exports = router;
// Path: routes/auth.js
