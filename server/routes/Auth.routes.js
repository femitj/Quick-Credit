import express from 'express';
import controller from '../controllers/User';
import middleware from '../middleware/auth-validations';
import passReset from '../services/reset.middleware';

// router handler
const router = express.Router();

//  Auth routes
//  register users
router.post('/auth/signup',
  middleware.validateRegister,
  middleware.isUserPresent,
  controller.registerUser);

// Login users
router.post('/auth/signin',
  middleware.validateLogin,
  controller.loginUser);

router.patch('/users/:useremail/verify',
  middleware.verifyAdminToken,
  controller.updateUser);

router.patch('/users/:useremail/upgrade',
  middleware.verifyAdminToken,
  controller.ugradeUser);

// reset pass
router.post('/reset',
  passReset.validateEmail,
  passReset.checkForEmail,
  passReset.createToken,
  passReset.mailer);

router.get('/reset/:token/password',
  passReset.validateToken,
  passReset.acceptRequest);

router.post('/new_password',
  passReset.validatePassword,
  passReset.verifyEmailToken,
  passReset.updatePassword);

module.exports = router;
