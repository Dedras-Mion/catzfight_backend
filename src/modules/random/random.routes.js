const express = require('express');
const randomCtrl = require('./random.controller');

const router = express.Router();

router.route('/')
  .get(randomCtrl.list);

router.route('/create')
  .post(randomCtrl.create)

module.exports = router;
