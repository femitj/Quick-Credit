import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database/config-db';
import queries from '../database/queries-db';

class Auth {
  static async createUser(body) {
    const {
      password, firstname, lastname, email, address,
    } = body;

    const hashPassword = bcryptjs.hashSync(password, 10);

    const userDetails = {
      firstname,
      lastname,
      email,
      hashPassword,
      address,
    };

    const { rows } = await db(queries.createUser(userDetails.firstname, userDetails.lastname, userDetails.email, userDetails.hashPassword, userDetails.address, 'unverified'));
    delete rows[0].password;

    const token = jwt.sign(rows[0], process.env.SECRET, { expiresIn: '1d' });
    return {
      token,
      user: rows[0],
    };
  }

  static async checkUser(email, password) {
    const { rows } = await db(queries.loginUser(email));


    if (!rows.length) {
      return {
        status: 400,
        error: 'invalid details',
      };
    }

    const token = jwt.sign(rows[0], process.env.SECRET, { expiresIn: '1d' });
    const pass = bcryptjs.compareSync(password, rows[0].password);
    delete rows[0].password;


    if (!pass) {
      return {
        status: 400,
        error: 'invalid details',
      };
    }

    return {
      token,
      user: rows[0],
    };
  }

  static async verifyClient(requestEmail) {
    const { rows } = await db(queries.updateClientStatus('verified', requestEmail));

    if (!rows.length) {
      return {
        status: 400,
        error: 'invalid email',
      };
    }

    const {
      email, firstname, lastname, address, status,
    } = rows[0];

    return {
      email,
      firstname,
      lastname,
      address,
      status,
    };
  }

  static async upgradeClient(requestEmail) {
    const { rows } = await db(queries.updateClientIsAdminStatus(true, requestEmail));

    if (!rows.length) {
      return {
        status: 400,
        error: 'invalid email',
      };
    }

    const {
      email, isadmin,
    } = rows[0];

    return {
      email,
      isadmin,
    };
  }
}

export default Auth;
