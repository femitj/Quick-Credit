import express from 'express';
import authMiddleware from '../middleware/auth-validations';
import controller from '../controllers/Repayment';
import middlewareLoans from '../middleware/loan-validations';

// router handler
const router = express.Router();

//  Loans routes
router.post('/loans/:loanid/repayment',
  authMiddleware.verifyAdminToken,
  middlewareLoans.loanRepayment,
  controller.postRepayment);

router.get('/loans/:loanid/repayments',
  authMiddleware.verifyToken,
  controller.getRepayment);

module.exports = router;
