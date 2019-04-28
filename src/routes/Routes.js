import express from 'express';
import User from '../controllers/User';

// router handler
const router = express.Router();

// User
router.post('/auth/signup', User.createUser);
router.post('/auth/signin', User.signin);

module.exports = router;
