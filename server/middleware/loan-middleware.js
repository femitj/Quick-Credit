import db from '../database/config-db';
import queries from '../database/queries-db';

const middleware = {
  async checkEligibility(req, res, next) {
    const { rows } = await db(queries.checkRepaid(req.user.email));
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

    const { rows } = await db(queries.createLoan(req.user.email, Date.now(), req.body.tenor, calcAmount, calcPaymentInstallment, 'pending', false, calcAmount, calcInterest, req.user.firstname, req.user.lastname));
    const {
      email, tenor, amount, paymentInstallment, status, repaid, balance, interest, firstname, lastname,
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
      firstname,
      lastname,
    };

    return next();
  },

  async getLoans(req, res, next) {
    const { status, repaid } = req.query;
    if (status === 'approved' && repaid === 'true') {
      const { rows } = await db(queries.getRepaidLoans(status));
      req.data = rows;
    }
    if (status === 'approved' && repaid === 'false') {
      const { rows } = await db(queries.getCurrentLoans(status));
      req.data = rows;
    }
    if (!status && !repaid) {
      const { rows } = await db(queries.getAllLoans());
      req.data = rows;
    }
    return next();
  },

  async getLoan(req, res, next) {
    const { id } = req.params;
    const { rows } = await db(queries.getSpecificLoan(id));
    req.data = rows;
    return next();
  },
};

export default middleware;
