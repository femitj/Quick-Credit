import jwt from 'jsonwebtoken';

const Helper = {
  generateToken: (id, isadmin, firstname, lastname, email) => {
    const token = jwt.sign({
      id,
      isadmin,
      firstname,
      lastname,
      email,
    },
    process.env.SECRET, { expiresIn: '1d' });
    return token;
  },
};

export default Helper;
