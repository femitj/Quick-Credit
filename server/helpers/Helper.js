import jwt from 'jsonwebtoken';

const Helper = {
  generateToken: (id, isAdmin) => {
    const token = jwt.sign({
      id,
      isAdmin,
    },
    process.env.SECRET, { expiresIn: '7d' });
    return token;
  },
};

export default Helper;
