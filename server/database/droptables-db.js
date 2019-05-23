import userDb from './user-db';
import loanDb from './loan-db';
import repaymentDb from './repayment-db';
import db from './config-db';

const dropAllTables = async () => {
  await db(repaymentDb.dropRepaymentTable());
  await db(loanDb.dropLoansTable());
  await db(userDb.dropUsersTable());
};

dropAllTables()
  .then(() => console.log('tables dropped'))
  .catch(err => console.log(err));

export default { dropAllTables };
