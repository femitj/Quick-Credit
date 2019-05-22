import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import db from '../database/config-db';
import queries from '../database/queries-db';

dotenv.config();

const middleware = {
  async checkVerified(req, res, next) {
    const { rows } = await db(queries.checkVerification(req.user.email, 'unverified'));
    if (rows.length) {
      return res.status(403).json({
        status: 403,
        error: 'Unavailable now!, User verification in process...',
      });
    }
    return next();
  },


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

  async selectEmail(req, res, next) {
    const requestId = req.params.id;
    const { rows } = await db(queries.selectEmailByLoanId(requestId));
    req.data = rows[0];
    console.log(req.data);
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
              <h3>Dear ${req.data.lastname},</h3>
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
