import bcryptjs from 'bcryptjs';
import userDb from './user-db';
import loanDb from './loan-db';
import repaymentDb from './repayment-db';
import db from './config-db';
import creatTable from './createtable-db';

const password = bcryptjs.hashSync('123456789', 10);


const migrateData = async () => {
  await db(userDb.createAdmin());
  await db(userDb.createUser('lanre', 'Tijani', 'tjhakeemus@gmail.com', password, 'n0 3 adebola ojomu street', 'verified'));
  await db(userDb.createUser('seun', 'Tijani', 'seun@gmail.com', password, 'n0 3 adebola ojomu street', 'verified'));
  await db(userDb.createUser('bayo', 'Tijani', 'bayo@gmail.com', password, 'n0 3 adebola ojomu street', 'verified'));
  await db(loanDb.createLoan('seun@gmail.com', '5 months', 100000, 21000, 'approved', false, 0, 5000, 'seun', 'Tijani'));
  await db(loanDb.createLoan('bola@gmail.com', '5 months', 100000, 21000, 'approved', true, 0, 5000, 'bola', 'Tijani'));
  await db(loanDb.createLoan('bola@gmail.com', '5 months', 100000, 21000, 'approved', true, 0, 5000, 'bola', 'Tijani'));
  await db(repaymentDb.createRepayment('1', 100000, 21000, 42000, 58000));
  await db(repaymentDb.createRepayment('2', 100000, 21000, 42000, 58000));
};

creatTable.createAllTables()
  .then(() => console.log('creating tables'))
  .then(() => migrateData())
  .then(() => console.log('migrating data'))
  .catch(err => console.log(err));

export default { creatTable, migrateData };
