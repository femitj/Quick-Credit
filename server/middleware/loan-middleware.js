import db from '../database/config-db';
import queries from '../database/queries-db';

const middleware = {
  async getLoans(req, res, next) {
    const { rows } = await db(queries.getAllLoans());
    req.data = rows;
    next();
  },
};

export default middleware;
