const express = require('express');
const resultCtrl = require('./winner.controller');

const router = express.Router();

router.route('/')
  .get(resultCtrl.list);

router.route('/find')
  .get(resultCtrl.findOne);

router.route('/create')
  .post(resultCtrl.create);

router.route('/update')
  .post(resultCtrl.update);
  
module.exports = router;
