import express from 'express';
import authMiddleware from '../middleware/auth-validations';
import controller from '../controllers/Loans';
import middleware from '../middleware/loan-middleware';
import middlewareLoans from '../middleware/loan-validations';

// router handler
const router = express.Router();

//  Loans routes
router.post('/loans',
  authMiddleware.verifyToken,
  middlewareLoans.loans,
  middleware.checkEligibility,
  middleware.createLoans,
  controller.postLoan);

router.get('/loans',
  authMiddleware.verifyAdminToken,
  middleware.getLoans,
  controller.getLoans);

router.get('/loans/:id',
  authMiddleware.verifyAdminToken,
  middlewareLoans.validateParams,
  middleware.getLoan,
  controller.getLoan);

router.patch('/loans/:id',
  authMiddleware.verifyAdminToken,
  middleware.updateStatus,
  middleware.mailer,
  controller.updateLoanStatus);

module.exports = router;
