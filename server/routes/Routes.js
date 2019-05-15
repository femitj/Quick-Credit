import express from 'express';
import controller from '../controllers/User';
import middleware from '../middleware/auth-validations';

// router handler
const router = express.Router();

//  Auth routes
//  register
router.post('/auth/signup',
  middleware.validateRegister,
  middleware.isUserPresent,
  middleware.createUser,
  controller.registerUser);

module.exports = router;
