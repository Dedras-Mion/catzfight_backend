const express = require('express');
const bettingCtrl = require('./betting.controller');

const router = express.Router();

router.route('/').get(bettingCtrl.list);

router.route('/find').get(bettingCtrl.find);

router
  .route('/create')
  .post(bettingCtrl.create)

  .get(bettingCtrl.get);

router.route('/update').post(
  bettingCtrl.update,
);

router.route('/delete/:roomNum').delete(bettingCtrl.remove);

module.exports = router;
