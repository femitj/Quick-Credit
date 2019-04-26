import db from '../models/user';

class User {
  static createUser(req, res) {
    const user = {
      id: db.length + 1,
      email: req.body.email, // String
      firstname: req.body.firstname, // String
      lastname: req.body.lastname, // String
      password: req.body.password, // String
      address: req.body.address, // String
      status: 'unverified',
    };
    db.push(user); // User created
    return res.status(201).json({
      status: 201,
      data: {
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      },
    });
  }
}

export default User;
