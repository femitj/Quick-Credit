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
  middleware.validateLoan,
  middleware.createLoans,
  controller.postLoan);

  router.get('/loans',
  authMiddleware.verifyAdminToken,
  middleware.getLoans,
  controller.getAllLoans);

module.exports = router;
