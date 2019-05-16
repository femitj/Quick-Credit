const queries = {

  checkUser: email => ({
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  }),

  createUser: (
    firstname,
    lastname,
    email,
    password,
    address,
    status,
  ) => ({
    text: `INSERT INTO 
      users(firstname, lastname, email, password, address, status) 
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    // eslint-disable-next-line max-len
    values: [firstname, lastname, email, password, address, status],
  }),

  loginUser: email => ({
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email],
  }),

  updateClientStatus: (status, email) => ({
    text: 'UPDATE users SET status = $1 WHERE email = $2 RETURNING *',
    values: [status, email],
  }),

};

export default queries;
