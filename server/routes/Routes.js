import express from 'express';
import controller from '../controllers/User';
import middleware from '../middleware/auth-validations';

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

module.exports = router;
