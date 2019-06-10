import express from 'express';
import controller from '../controllers/User';
import middleware from '../middleware/auth-validations';
import service from '../services/auth';
import passReset from '../services/reset.middleware';

// router handler
const router = express.Router();

//  Auth routes
//  register users
router.post('/auth/signup',
  middleware.validateRegister,
  middleware.isUserPresent,
  service.createUser,
  controller.registerUser);

// Login users
router.post('/auth/signin',
  middleware.validateLogin,
  service.checkUser,
  controller.loginUser);

router.patch('/users/:useremail/verify',
  middleware.verifyAdminToken,
  service.verifyClient,
  controller.updateUser);

router.patch('/users/:useremail/upgrade',
  middleware.verifyAdminToken,
  service.upgradeClient,
  controller.ugradeUser);

router.get('/users',
  middleware.verifyAdminToken,
  service.getUsers,
  controller.getUsers);

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
