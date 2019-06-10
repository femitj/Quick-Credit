import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../database/config-db';
import queries from '../database/queries-db';
import Helper from '../helpers/Helper';

class Auth {
  static async createUser(req, res, next) {
    const {
      password, firstname, lastname, email, address,
    } = req.body;

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

    const token = Helper.generateToken(rows[0].id, rows[0].isadmin, rows[0].firstname, rows[0].lastname, rows[0].email);
    req.data = {
      token,
      user: rows[0],
    };
    return next();
  }

  static async checkUser(req, res, next) {
    const { email, password } = req.body;
    const { rows } = await db(queries.loginUser(email));


    if (!rows.length) {
      return res.status(400).json({
        status: 400,
        error: 'invalid details',
      });
    }

    const token = Helper.generateToken(rows[0].id, rows[0].isadmin, rows[0].firstname, rows[0].lastname, rows[0].email);
    const pass = bcryptjs.compareSync(password, rows[0].password);
    delete rows[0].password;


    if (!pass) {
      return res.status(400).json({
        status: 400,
        error: 'invalid details',
      });
    }

    req.data = {
      token,
      user: rows[0],
    };
    return next();
  }

  static async verifyClient(req, res, next) {
    const { useremail } = req.params;
    const { rows } = await db(queries.updateClientStatus('verified', useremail));

    if (!rows.length) {
      return res.status(400).json({
        status: 400,
        error: 'invalid email',
      });
    }

    const {
      email, firstname, lastname, address, status,
    } = rows[0];

    req.data = {
      email,
      firstname,
      lastname,
      address,
      status,
    };
    return next();
  }

  static async upgradeClient(req, res, next) {
    const { useremail } = req.params;
    const { rows } = await db(queries.updateClientIsAdminStatus(true, useremail));

    if (!rows.length) {
      return res.status(400).json({
        status: 400,
        error: 'invalid email',
      });
    }

    const {
      email, isadmin,
    } = rows[0];

    req.data = {
      email,
      isadmin,
    };
    return next();
  }

  static async getUsers(req, res, next) {
    const { rows } = await db(queries.getAllUsers());
    req.data = rows;
    return next();
  }
}

export default Auth;
