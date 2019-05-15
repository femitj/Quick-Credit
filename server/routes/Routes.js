import express from 'express';
import User from '../controllers/User';
import Loan from '../controllers/Loans';
import middleware from '../middleware/auth-validations';
import middlewareLoans from '../middleware/loan-validations';

// router handler
const router = express.Router();

//  Auth routes
//  register
router.post('/auth/signup',
  middleware.validateRegister,
  User.createUser);
//  login
router.post('/auth/signin',
  middleware.validateLogin,
  User.signin);

router.patch('/users/:useremail/verify', User.verifyClient);

//  Loans routes
router.post('/loans',
  middlewareLoans.loans,
  Loan.createLoan);

router.get('/loans', Loan.getAllLoans);
router.get('/loans', Loan.getRepaidLoans);
router.get('/loans', Loan.getCurrentLoans);
router.get('/loans/:id', Loan.getLoan);
router.patch('/loans/:loanid', Loan.updateLoanStatus);
router.post('/loans/:loanid/repayment',
  middlewareLoans.loanRepayment,
  Loan.createLoanRepayment);

router.get('/loans/:loanid/repayments', Loan.getRepaymentHistory);

module.exports = router;
