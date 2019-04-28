import db from '../models/user';

class User {
  static createUser(req, res) {
    const user = {
      token: Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2),
      id: db.length + 1,
      email: req.body.email, // String
      firstname: req.body.firstname, // String
      lastname: req.body.lastname, // String
      password: req.body.password, // String
      address: req.body.address, // String
      status: 'unverified',
      isAdmin: false,
    };
    db.push(user); // User created
    return res.status(201).json({
      status: 201,
      data: {
        token: user.token,
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      },
    });
  }

  // Sign in
  static signin(req, res) {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
    const userF = db.find(check => (check.email === user.email && check.password === user.password));
    // User not found
    if (!userF) {
      return res.status(404).json({
        status: 404,
        error: 'User not found',
      });
    }
    // User found
    return res.status(200).json({
      status: 200,
      data: {
        token: userF.token,
        id: userF.id,
        firstName: userF.firstname,
        lastName: userF.lastname,
        email: userF.email,
        isAdmin: userF.isAdmin,
      },
    });
  }
}


export default User;
