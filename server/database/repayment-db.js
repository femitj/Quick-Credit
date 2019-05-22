const dropRepaymentTable = () => 'DROP TABLE IF EXISTS repayments';

const deleteRepayment = id => ({
  text: 'DELETE FROM repayments WHERE id = $1',
  values: [id],
});

const createRepayment = (
  loanId,
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
});

export default {
  dropRepaymentTable,
  deleteRepayment,
  createRepayment,
};
