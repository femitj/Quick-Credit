import express from 'express';
import authMiddleware from '../middleware/auth-validations';
import controller from '../controllers/Repayment';
import middleware from '../middleware/repayment-middleware';
import middlewareLoans from '../middleware/loan-validations';

// router handler
const router = express.Router();

//  Loans routes
router.post('/loans/:loanid/repayment',
  authMiddleware.verifyAdminToken,
  middlewareLoans.loanRepayment,
  middleware.createRepaymentRecord,
  controller.postRepayment);

router.get('/loans/:loanid/repayments',
  authMiddleware.verifyToken,
  middleware.getRepayment,
  controller.getRepayment);

module.exports = router;
