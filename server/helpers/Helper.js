import jwt from 'jsonwebtoken';

const Helper = {
  generateToken: (id, isadmin) => {
    const token = jwt.sign({
      id,
      isadmin,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};

export default Helper;
