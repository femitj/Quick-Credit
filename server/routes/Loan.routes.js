import express from 'express';
import authMiddleware from '../middleware/auth-validations';
import controller from '../controllers/Loans';
import service from '../services/loans';
import middleware from '../middleware/loan-validations';

// router handler
const router = express.Router();

//  Loans routes
router.post('/loans',
  authMiddleware.verifyToken,
  middleware.loans,
  service.checkVerified,
  service.checkEligibility,
  service.createLoans,
  controller.postLoan);

router.get('/loans',
  authMiddleware.verifyAdminToken,
  middleware.queryChecker,
  service.getLoans,
  controller.getLoans);

router.get('/loans/:id',
  authMiddleware.verifyAdminToken,
  middleware.validateParams,
  service.getLoan,
  controller.getLoan);

router.patch('/loans/:id',
  authMiddleware.verifyAdminToken,
  service.updateStatus,
  service.mailer,
  controller.updateLoanStatus);

module.exports = router;
