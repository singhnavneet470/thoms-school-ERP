const router = require('express').Router();
const ctrl = require('./auth.controller');
const { verifyToken } = require('../../middleware/auth');
const { authorize } = require('../../middleware/rbac');
const { ROLES } = require('../../config/constants');
const { loginLimiter, changePasswordLimiter, forgotPasswordLimiter } = require('../../middleware/ratelimiter');

router.post('/login', loginLimiter, ctrl.login);
router.post('/refresh', ctrl.refresh);
router.post('/logout', verifyToken, ctrl.logout);
router.get('/me', verifyToken, ctrl.me);
router.get('/students', verifyToken, authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN), ctrl.students);
router.put('/change-password', verifyToken, changePasswordLimiter, ctrl.changePassword);
router.get('/permissions', verifyToken, ctrl.permissions);
router.post('/forgot-password', forgotPasswordLimiter, ctrl.forgotPassword);

module.exports = router;