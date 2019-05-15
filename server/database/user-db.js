import bcryptjs from 'bcryptjs';

const adminPassword = bcryptjs.hashSync('yankee', 10);

const createUsersTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(40) NOT NULL,
            lastname VARCHAR(40) NOT NULL,
            email VARCHAR(40) UNIQUE NOT NULL,
            password VARCHAR(100),
            address VARCHAR(40) NOT NULL,
            status VARCHAR(40),
            isadmin BOOLEAN 
            
          )`;
  return text;
};

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
    'approved',
    true,
  ],
});


export default {
  createUsersTable,
  dropUsersTable,
  deleteUser,
  createUser,
  createAdmin,
};
