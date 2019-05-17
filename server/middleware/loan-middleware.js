import db from '../database/config-db';
import queries from '../database/queries-db';

const middleware = {
  async validateLoan(req, res, next) {
    const { rows } = await db(queries.checkRepaid(req.body.email));
    if (rows.length) {
      return res.status(409).json({
        status: 409,
        error: 'you have an out-standing loan',
      });
    }
    return next();
  },

  async createLoans(req, res, next) {
    const calcAmount = parseFloat(req.body.amount);
    const calcInterest = ((5 / 100) * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / req.body.tenor);

    const { rows } = await db(queries.createLoan(req.body.email, 'NOW', req.body.tenor, calcAmount, calcPaymentInstallment, 'pending', false, calcAmount, calcInterest));
    const {
      email, tenor, amount, paymentInstallment, status, repaid, balance, interest,
    } = rows[0];
    req.data = {
      loanId: rows[0].id,
      email,
      tenor,
      amount,
      paymentInstallment,
      status, // should default to pending
      repaid,
      balance,
      interest,
    };

    return next();
  },

  async getLoans(req, res, next) {
    const { rows } = await db(queries.getAllLoans());
    req.data = rows;
    next();
  },
};

export default middleware;
