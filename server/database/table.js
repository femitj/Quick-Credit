const queryTextUsers = `CREATE TABLE IF NOT EXISTS
users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(40) NOT NULL,
  lastname VARCHAR(40) NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(100),
  address VARCHAR(40) NOT NULL,
  status VARCHAR(40),
  "isadmin" BOOLEAN default FALSE
)`;

const queryTextLoans = `CREATE TABLE IF NOT EXISTS
loans(
  id SERIAL PRIMARY KEY,
  email VARCHAR(40),
  createdOn VARCHAR(128) NOT NULL,
  tenor VARCHAR(40) NOT NULL,
  amount INTEGER NOT NULL,
  paymentInstallment INTEGER NOT NULL,
  status VARCHAR(40),
  repaid BOOLEAN,
  balance INTEGER NOT NULL,
  interest INTEGER NOT NULL
)`;

const queryTextRepayments = `CREATE TABLE IF NOT EXISTS
repayments(
  id SERIAL PRIMARY KEY,
  loanId INTEGER NOT NULL,
  createdOn VARCHAR(128) NOT NULL,
  amount INTEGER NOT NULL,
  monthlyInstallment INTEGER NOT NULL,
  paidAmount INTEGER NOT NULL,
  balance INTEGER NOT NULL
)`;

export default { queryTextUsers, queryTextLoans, queryTextRepayments };
