const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/datatables", adminController.getDatatables);
router.get("/api/products", adminController.getProducts);
router.get("/input-product", adminController.getInputProduct);
module.exports = router;
