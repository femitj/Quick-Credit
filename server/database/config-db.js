import { Pool } from 'pg';
import dotenv from 'dotenv';
import config from '../config/config';

dotenv.config();

const env = process.env.NODE_ENV;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: true,
});


pool.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('connected to db');
});


const query = (text, params, callback) => pool.query(text, params, callback);

export default query;
