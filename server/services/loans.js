import db from '../database/config-db';
import queries from '../database/queries-db';

class Loans {
  static async createLoans(body, user) {
    const {
      amount, tenor,
    } = body;
    const {
      email, firstname, lastname,
    } = user;
    const calcAmount = parseFloat(amount);
    const calcInterest = ((5 / 100) * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / tenor);

    const { rows } = await db(queries.createLoan(email, tenor, calcAmount, calcPaymentInstallment, 'pending', false, calcAmount, calcInterest, firstname, lastname));
    const {
      paymentInstallment, status, repaid, balance, interest,
    } = rows[0];
    return {
      loanId: rows[0].id,
      email,
      tenor: rows[0].tenor,
      amount: rows[0].amount,
      paymentInstallment,
      status, // should default to pending
      repaid,
      balance,
      interest,
      firstname,
      lastname,
    };
  }

  static async getLoans(query) {
    const { status, repaid } = query;
    if (status === 'approved' && repaid === 'true') {
      const { rows } = await db(queries.getRepaidLoans(status));
      return rows;
    }
    if (status === 'approved' && repaid === 'false') {
      const { rows } = await db(queries.getCurrentLoans(status));
      return rows;
    }
    if (!status && !repaid) {
      const { rows } = await db(queries.getAllLoans());
      return rows;
    }
  }

  static async getLoan(id) {
    const { rows } = await db(queries.getSpecificLoan(id));
    // specific loan not found
    if (!rows[0]) {
      return {
        status: 404,
        error: `loan with id:${id} not found`,
      };
    }
    return rows[0];
  }

  static async updateStatus(requestedStatus, id) {
    const { rows } = await db(queries.updateClientLoanStatus(requestedStatus, id));

    const {
      tenor, amount, paymentInstallment, status, interest, email,
    } = rows[0];

    return {
      loanId: rows[0].id,
      loanAmount: amount,
      tenor,
      status,
      monthlyInstallment: paymentInstallment,
      interest,
      email,
    };
  }
}

export default Loans;
