import express from 'express';
import User from '../controllers/User';
import Loan from '../controllers/Loans';

// router handler
const router = express.Router();

// User
router.post('/auth/signup', User.createUser);
router.post('/auth/signin', User.signin);
router.patch('/users/:useremail/verify', User.verifyClient);

// Loans
router.post('/loans', Loan.createLoan);
router.get('/loans', Loan.getAllLoans);
router.get('/loan', Loan.getRepaidLoans);
router.get('/currentloans', Loan.getCurrentLoans);
router.get('/loans/:id', Loan.getLoan);
router.patch('/loans/:loanid', Loan.updateLoanStatus);
router.post('/loans/:loanid/repayment', Loan.createLoanRepayment);

module.exports = router;
