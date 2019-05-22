import db from '../database/config-db';
import queries from '../database/queries-db';

class Repayment {
  static async createRepaymentRecord(body, loanid) {
    // const requestLoanId = req.params.loanid;
    const {
      amount, monthlyInstallment, paidAmount, balance,
    } = body;
    
    const { rows } = await db(queries.createRepayment(loanid, Date.now(), amount, monthlyInstallment, paidAmount, balance));
    // eslint-disable-next-line prefer-destructuring
    return rows[0];
  }

  static async getRepayment(loanid) {
    // const { loanid } = req.params;
    const { rows } = await db(queries.getRepaymentHistory(loanid));
    return rows;
  }
}

export default Repayment;
