import bcryptjs from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;
const superAdminPassword = bcryptjs.hashSync(process.env.SUPER_ADMIN_PASSWORD, 10);

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
    superAdminEmail,
    superAdminPassword,
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
