import jwt from 'jsonwebtoken';
import db from '../database/config-db';
import queries from '../database/queries-db';


const { emailPattern } = {
  emailPattern: /^[a-z\d]+@[a-z]+\.(com|co)[a-z]+$/,
};

const validations = {
  validateRegister(req, res, next) {
    let verified = true;
    const error = [];

    const {
      firstname, lastname, email, password, address,
    } = req.body;


    if (!firstname || !lastname) {
      verified = false;
      error.push({ names: 'more than one name is required' });
    }

    if (firstname || lastname) {
      if (!(/^[a-z]{2,40}$/i.test(firstname))) {
        verified = false;
        error.push({ firstname: `${firstname} must be valid: only letters` });
      }

      if (!(/^[a-z]{2,40}$/i.test(lastname))) {
        verified = false;
        error.push({ lastname: `${lastname} must be valid: only letters` });
      }
    }

    if (!email || !email.trim()) {
      verified = false;
      error.push({ email: 'email must be present' });
    }

    if (!(emailPattern.test(email))) {
      verified = false;
      error.push({ email: 'email must be valid format: yorname@mail.com' });
    }

    if (!(/^[\w@-]{8,}$/.test(password))) {
      verified = false;
      error.push({ password: 'password should be more than 8 characters and can have uppercase, lowercase, numbers, @ and - ' });
    }

    if (!address) {
      verified = false;
      error.push({ address: 'address must be present' });
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },


  validateLogin(req, res, next) {
    let verified = true;
    const error = [];

    const { email, password } = req.body;

    if (!(emailPattern.test(email))) {
      verified = false;
      error.push({ email: 'email must be valid format: yorname@mail.com' });
    }


    if (!email || !email.trim()) {
      verified = false;
      error.push({ email: 'email is required' });
    }


    if (!password || !password.trim()) {
      verified = false;
      error.push({ password: 'password is required' });
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },

  async isUserPresent(req, res, next) {
    const { rows } = await db(queries.checkUser(
      req.body.email,
    ));

    if (rows.length) {
      if (rows[0].email === req.body.email) {
        return res.status(409).json({
          status: 409,
          error: 'That email has already been used',
        });
      }
    }

    return next();
  },

  async verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'you need access',
      });
    }

    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      delete decoded.password;
      req.user = decoded;
    } catch (error) {
      if (error.expiredAt) {
        return res.status(400).json({
          status: 400,
          error: 'Authentication failed, token expired',
        });
      }
      return res.status(400).send(error);
    }
    return next();
  },

  async verifyAdminToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({
        status: 403,
        error: 'you need access',
      });
    }

    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      delete decoded.password;
      req.user = decoded;
      if (!req.user.isadmin) {
        return res.status(403).json({
          status: 403,
          error: 'Unauthorized!, Admin only route',
        });
      }
      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  },
};

export default validations;
