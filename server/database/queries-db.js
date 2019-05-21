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
      loans(email, tenor, amount, paymentInstallment, status, repaid, balance, interest, firstname, lastname) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    // eslint-disable-next-line max-len
    values: [email, tenor, amount, paymentInstallment, status, repaid, balance, interest, firstname, lastname],
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
      repayments(loanId, amount, monthlyInstallment, paidAmount, balance) 
      VALUES($1, $2, $3, $4, $5) RETURNING *`,
    // eslint-disable-next-line max-len
    values: [loanId, amount, monthlyInstallment, paidAmount, balance],
  }),

  getRepaymentHistory: loanid => ({
    text: 'SELECT * FROM repayments WHERE loanid = $1',
    values: [loanid],
  }),

  updateClientLoanStatus: (status, id) => ({
    text: 'UPDATE loans SET status = $1 WHERE id = $2 RETURNING *',
    values: [status, id],
  }),

  selectUserEmail: email => ({
    text: 'SELECT * from users WHERE email = $1',
    values: [email],
  }),

  updatePassword: (password, email) => ({
    text: 'UPDATE users SET password = $1 WHERE email = $2 RETURNING *',
    values: [password, email],
  }),

  selectEmailByLoanId: id => ({
    text: 'SELECT * from loans WHERE id = $1',
    values: [id],
  }),

  updateClientIsAdminStatus: (isadmin, email) => ({
    text: 'UPDATE users SET isadmin = $1 WHERE email = $2 RETURNING *',
    values: [isadmin, email],
  }),

  checkVerification: (email, status) => ({
    text: 'SELECT * FROM users WHERE email = $1 and status = $2',
    values: [email, status],
  }),

};

export default queries;
