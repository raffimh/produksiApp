const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/datatables", adminController.getDatatables);
router.get("/api/products", adminController.getProducts);
router.get("/input-product", adminController.getInputProduct);
router.get("/edit-product/:nomor_order", adminController.getEditProduct);
router.post("/edit-product/:nomor_order", adminController.postUpdateProduct);
router.post("/submit-product", adminController.getPostProduct);
module.exports = router;
