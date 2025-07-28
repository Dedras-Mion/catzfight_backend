const express = require("express");
const waitingCtrl = require("./waiting.controller");

const router = express.Router();

router.route("/").get(waitingCtrl.list);

router.route("/create").post(waitingCtrl.create);

router.route("/delete/:address").delete(waitingCtrl.remove);

module.exports = router;
