const dropLoansTable = () => 'DROP TABLE IF EXISTS loans';

const deleteLoan = id => ({
  text: 'DELETE FROM loans WHERE id = $1',
  values: [id],
});

const createLoan = (
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
});

export default {
  dropLoansTable,
  deleteLoan,
  createLoan,
};
