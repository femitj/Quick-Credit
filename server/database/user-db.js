import bcryptjs from 'bcryptjs';

const adminPassword = bcryptjs.hashSync('yankee', 10);

const dropUsersTable = () => 'DROP TABLE IF EXISTS users';

const deleteUser = id => ({
  text: 'DELETE FROM users WHERE id = $1',
  values: [id],
});

const createUser = (
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
});

const createAdmin = () => ({

  text: `INSERT INTO
    users(firstname, lastname, email, password, address, status, "isadmin") VALUES($1, $2, $3, $4, $5, $6, $7)`,
  values: [
    'Femi',
    'Tijani',
    'admin@gmail.com',
    adminPassword,
    'no 3 Arogundade str',
    'verified',
    true,
  ],
});


export default {
  dropUsersTable,
  deleteUser,
  createUser,
  createAdmin,
};
