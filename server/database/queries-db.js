const queries = {

  checkUser: (email) => ({
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

};

export default queries;
