import express from 'express';
import dotenv from 'dotenv';
import swaggerUI from 'swagger-ui-express';
import routes from './routes/Auth.routes';
import Loan from './routes/Loan.routes';
import Repayment from './routes/Repayment.routes';
import 'babel-polyfill';
import doc from '../quick-credit-swagger.json';

const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// render swagger UI
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(doc));

app.use(express.json());
app.use('/', express.static('UI'));

app.get('/api/v1', (req, res) => res.status(200).json({ message: 'Welcome to the Quick Credit API' }));

app.use('/api/v1', routes);
app.use('/api/v1', Loan);
app.use('/api/v1', Repayment);

const server = app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

module.exports = server;
