import db from '../database/config-db';
import sgMail from '@sendgrid/mail';
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
    // specific loan not found
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: `loan with id:${req.params.id} not found`,
      });
    }
    req.data = rows[0];
    return next();
  },

  async updateStatus(req, res, next) {
    const requestId = req.params.id;

    const { rows } = await db(queries.updateClientLoanStatus(req.body.status, requestId));

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
  },

  mailer(req, res, next) {
    const htmlBody = `<!DOCTYPE html>
      <html>

      <head>
          <title>Forget Password Email</title>
      </head>

      <body>
          <div>
              <h3>Dear ${req.data.email},</h3>
              <p>Your loan has been approved</p>
              <br>
              <p>Cheers!</p>
          </div>

      </body>

      </html>`;

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: req.data.email,
      from: 'no-reply@quickcredit.com',
      subject: 'Quick Credit Pasword Reset',
      html: htmlBody,
    };
    // eslint-disable-next-line consistent-return
    sgMail.send(msg);

    return next();
  },
};

export default middleware;
