const express = require("express");
const nftCtrl = require("./nft.controller");

const router = express.Router();

router.route("/ids").get(nftCtrl.findIds);

router.route("/urls").get(nftCtrl.findUrls);

module.exports = router;
