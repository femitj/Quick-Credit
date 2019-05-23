import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import db from '../database/config-db';
import queries from '../database/queries-db';

dotenv.config();

class Loans {
  static async checkVerified(req, res, next) {
    const { rows } = await db(queries.checkVerification(req.user.email, 'unverified'));
    if (rows.length) {
      return res.status(403).json({
        status: 403,
        error: 'Unavailable now!, User verification in process...',
      });
    }
    return next();
  }

  static async checkEligibility(req, res, next) {
    const { rows } = await db(queries.checkRepaid(req.user.email));
    if (rows.length) {
      return res.status(409).json({
        status: 409,
        error: 'you have an out-standing loan',
      });
    }
    return next();
  }

  static async createLoans(req, res, next) {
    const {
      amount, tenor,
    } = req.body;
    const {
      email, firstname, lastname,
    } = req.user;
    const interestRatio = process.env.INTEREST_RATIO;
    const calcAmount = parseFloat(amount);
    const calcInterest = (interestRatio * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / tenor);

    const { rows } = await db(queries.createLoan(email, tenor, calcAmount, calcPaymentInstallment, 'pending', false, calcAmount, calcInterest, firstname, lastname));
    const {
      paymentInstallment, status, repaid, balance, interest,
    } = rows[0];
    req.data = {
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
    return next();
  }

  static async getLoans(req, res, next) {
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
  }

  static async getLoan(req, res, next) {
    const { id } = req.params;
    const { rows } = await db(queries.getSpecificLoan(id));
    // specific loan not found
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: `loan with id:${id} not found`,
      });
    }
    req.data = rows[0];
    return next();
  }

  static async mailer(req, res, next) {
    const requestId = req.params.id;
    const { rows } = await db(queries.selectEmailByLoanId(requestId));
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: `loan with id:${rows[0].id} not found`,
      });
    }
    const { lastname, email } = rows[0];
    const htmlBody = `<!DOCTYPE html>
      <html>

      <head>
          <title>Forget Password Email</title>
      </head>

      <body>
          <div>
              <h3>Dear ${lastname},</h3>
              <p>Your loan has been approved</p>
              <br>
              <p>Cheers!</p>
          </div>

      </body>

      </html>`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'no-reply@quickcredit.com',
      subject: 'Quick Credit Pasword Reset',
      html: htmlBody,
    };
    // eslint-disable-next-line consistent-return
    sgMail.send(msg);

    return next();
  }

  static async updateStatus(req, res, next) {
    const { rows } = await db(queries.updateClientLoanStatus(req.body.status, req.params.id));

    const {
      tenor, amount, paymentInstallment, status, interest, email,
    } = rows[0];

    req.data = {
      loanId: rows[0].id,
      loanAmount: amount,
      tenor,
      status,
      monthlyInstallment: paymentInstallment,
      interest,
      email,
    };
    return next();
  }
}

export default Loans;
