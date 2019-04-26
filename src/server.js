import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/Routes';
import 'babel-polyfill';

const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.json());
app.use('/', express.static('UI'));

app.get('/api/v1', (req, res) => res.status(200).send({ message: 'Welcome to the Quick Credit API' }));

app.use('/api/v1', routes);

const server = app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});

module.exports = server;
