const express = require('express');
const userRoutes = require('./modules/user/user.routes');
const authRoutes = require('./modules/auth/auth.routes');
const bettingRoutes = require('./modules/betting/betting.routes');
const nftRoutes = require('./modules/nft/nft.routes');
const userInfoRoutes = require('./modules/userinfo/userinfo.routes');
const resultRoutes = require('./modules/result/result.routes');
const winnerRoutes = require('./modules/winner/winner.routes');
const randomRoutes = require('./modules/random/random.routes');
const approvedRoutes = require('./modules/approved/approved.routes');
const waitingRoutes = require('./modules/waiting/waiting.routes');

const router = express.Router();

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

// mount auth routes at /auth
router.use('/auth', authRoutes);
router.use('/betting', bettingRoutes);
router.use('/nft', nftRoutes);
router.use('/userinfo', userInfoRoutes);
router.use('/result', resultRoutes);
router.use('/winner', winnerRoutes);
router.use('/random', randomRoutes);
router.use('/waiting', waitingRoutes);
router.use('/approved', approvedRoutes);

// Validating all the APIs with jwt token.
// router.use(expressJwt({
//   secret: config.jwtSecret,
//   algorithms: ['HS256'],
//   resultProperty: 'locals.session',
//   getToken: function fromHeaderOrQuerystring(req) {
//     if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
//       return req.headers.authorization.split(' ')[1];
//     }
//     if (req.query && req.query.token) {
//       return req.query.token;
//     }
//     return null;
//   },
// }));

// mount user routes at /users
router.use('/users', userRoutes);

module.exports = router;
