const express = require("express");
const approvedCtrl = require("./approved.controller");

const router = express.Router();

router.route("/").get(approvedCtrl.list);

router.route("/create").post(approvedCtrl.create);

router.route("/delete/:address").delete(approvedCtrl.remove);

module.exports = router;
