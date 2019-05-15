import query from './table';
import db from './config-db.';

const createAllTables = async () => {
  await db(query.queryTextUsers);
  await db(query.queryTextLoans);
};

export default { createAllTables };
