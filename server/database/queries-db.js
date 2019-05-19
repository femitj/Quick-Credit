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

  checkRepaid: email => ({
    text: 'SELECT * FROM loans WHERE email = $1 and repaid = false',
    values: [email],
  }),

  createLoan: (
    email,
    createdOn,
    tenor,
    amount,
    paymentInstallment,
    status,
    repaid,
    balance,
    interest,
    firstname,
    lastname,
  ) => ({
    text: `INSERT INTO 
      loans(email, createdOn, tenor, amount, paymentInstallment, status, repaid, balance, interest, firstname, lastname) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    // eslint-disable-next-line max-len
    values: [email, createdOn, tenor, amount, paymentInstallment, status, repaid, balance, interest, firstname, lastname],
  }),

  getAllLoans: () => 'SELECT * FROM loans',

  getRepaidLoans: status => ({
    text: 'SELECT * FROM loans WHERE status = $1 and repaid = true',
    values: [status],
  }),

  getCurrentLoans: status => ({
    text: 'SELECT * FROM loans WHERE status = $1 and repaid = false',
    values: [status],
  }),

  getSpecificLoan: id => ({
    text: 'SELECT * FROM loans WHERE id = $1',
    values: [id],
  }),

  createRepayment: (
    loanId,
    createdOn,
    amount,
    monthlyInstallment,
    paidAmount,
    balance,
  ) => ({
    text: `INSERT INTO 
      repayments(loanId, createdOn, amount, monthlyInstallment, paidAmount, balance) 
      VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
    // eslint-disable-next-line max-len
    values: [loanId, createdOn, amount, monthlyInstallment, paidAmount, balance],
  }),

};

export default queries;
