import express from 'express';
import User from '../controllers/User';
import Loan from '../controllers/Loans';

// router handler
const router = express.Router();

// User
router.post('/auth/signup', User.createUser);
router.post('/auth/signin', User.signin);
router.post('/loans', Loan.createLoan);
router.get('/loans', Loan.getAllLoans);

module.exports = router;