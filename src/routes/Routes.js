import express from 'express';
import User from '../controllers/User';

// router handler
const router = express.Router();

// User
router.post('/auth/signup', User.createUser);

module.exports = router;
