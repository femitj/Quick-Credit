import express from 'express';
import controller from '../controllers/User';
import middleware from '../middleware/auth-validations';
import passReset from '../middleware/reset.middleware';

// router handler
const router = express.Router();

//  Auth routes
//  register users
router.post('/auth/signup',
  middleware.validateRegister,
  middleware.isUserPresent,
  middleware.createUser,
  controller.registerUser);

// Login users
router.post('/auth/signin',
  middleware.validateLogin,
  middleware.checkUser,
  controller.loginUser);

router.patch('/users/:useremail/verify',
  middleware.verifyAdminToken,
  middleware.verifyClient,
  controller.updateUser);

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
