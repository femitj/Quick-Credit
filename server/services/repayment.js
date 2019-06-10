import db from '../database/config-db';
import queries from '../database/queries-db';

const Repayment = {
  async createRepaymentRecord(req, res, next) {
    const { loanid } = req.params;
    const { rows: rowss } = await db(queries.getSpecificLoan(loanid));
    const {
      amount, paymentinstallment, balance, repaid,
    } = rowss[0];
    const {
      paidAmount,
    } = req.body;
    if (repaid) {
      return res.status(400).json({
        status: 400,
        error: `loan with id:${loanid} has been fully repaid`,
      });
    }
    if (balance == 0) {
      db(queries.updateClientLoanRepaid(true, loanid));
      return res.status(400).json({
        status: 400,
        error: `loan application id:${loanid} fully repaid`,
      });
    }
    if (balance > 0) {
      const newBalance = (balance - paidAmount);

      db(queries.updateClientLoanBalance(newBalance, loanid));
      const { rows } = await db(queries.createRepayment(loanid, amount, paymentinstallment, paidAmount, newBalance));
      // eslint-disable-next-line prefer-destructuring
      req.data = rows[0];
      return next();
    }
  },

  async CheckAuthorise(req, res, next) {
    const { loanid } = req.params;
    const requestedEmail = req.user.email;
    const { rows } = await db(queries.getLoansWithLoanid(loanid));
    const { email } = rows[0];
    if (!(requestedEmail === email)) {
      return res.status(403).json({
        status: 403,
        error: 'Not Authorised',
      });
    }
    return next();
  },

  async getRepayment(req, res, next) {
    const { loanid } = req.params;
    const { rows } = await db(queries.getRepaymentHistory(loanid));
    req.data = rows;
    return next();
  },
};

export default Repayment;
