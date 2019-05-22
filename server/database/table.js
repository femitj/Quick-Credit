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
  email VARCHAR(40) NOT NULL,
  createdOn DATE DEFAULT NOW(),
  tenor VARCHAR(40) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  paymentInstallment DECIMAL(10,2) NOT NULL,
  status VARCHAR(40),
  repaid BOOLEAN,
  balance DECIMAL(10,2) NOT NULL,
  interest DECIMAL(10,2) NOT NULL,
  firstname VARCHAR(40) NOT NULL,
  lastname VARCHAR(40) NOT NULL
)`;

const queryTextRepayments = `CREATE TABLE IF NOT EXISTS
repayments(
  id SERIAL PRIMARY KEY,
  loanId INTEGER NOT NULL,
  createdOn DATE DEFAULT NOW(),
  amount DECIMAL(10,2) NOT NULL,
  monthlyInstallment DECIMAL(10,2) NOT NULL,
  paidAmount DECIMAL(10,2) NOT NULL,
  balance DECIMAL(10,2) NOT NULL
)`;

export default { queryTextUsers, queryTextLoans, queryTextRepayments };
