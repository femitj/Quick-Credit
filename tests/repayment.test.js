import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';

chai.use(chaiHttp);
chai.should();

const loanOne = {
  tenor: 5,
  amount: 100000,
};

let userToken;
let adminToken;

describe('POST api/v1/auth/signin', () => {
  it('should successfully log admin in if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'admin@gmail.com',
        password: 'yankee',
      })
      .end((err, res) => {
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        adminToken = body.data[0].token;
        done();
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  it('should successfully log admin in if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'bola@gmail.com',
        password: 'tijani123',
      })
      .end((err, res) => {
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        userToken = body.data[0].token;
        done();
      });
  });
});

describe('POST /loans repayment record', () => {
  it('should post loan repayment record in respect of a client', (done) => {
    chai.request(app)
      .post('/api/v1/loans/3/repayment')
      .set('Authorization', adminToken)
      .send({
        amount: '100000',
        monthlyInstallment: '22000',
        paidAmount: '80000',
        balance: '70000',
      })
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(201);
        done();
      });
  });
});


describe('POST loan repayment record with invalid amount fields', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/2/repayment')
      .set('Authorization', adminToken)
      .send({
        amount: '',
        monthlyInstallment: '',
        paidAmount: '',
        balance: '',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('inputs');
        done();
      });
  });
});

describe('POST loan repayment record with invalid monthly installment value', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/2/repayment')
      .set('Authorization', adminToken)
      .send({
        amount: '10000',
        monthlyInstallment: 'femi22000',
        paidAmount: '80000',
        balance: '70000',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('inputs');
        res.body.error[1].should.have.property('monthlyInstallment');
        done();
      });
  });
});

describe('POST loan repayment record with invalid amount value', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/2/repayment')
      .set('Authorization', adminToken)
      .send({
        amount: 'a',
        monthlyInstallment: '22000',
        paidAmount: '80000',
        balance: '70000',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('inputs');
        res.body.error[1].should.have.property('amount');
        done();
      });
  });
});

describe('POST loan repayment record with invalid paidAmount value', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/4/repayment')
      .set('Authorization', adminToken)
      .send({
        amount: '10000',
        monthlyInstallment: '22000',
        paidAmount: 'a',
        balance: '70000',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('inputs');
        res.body.error[1].should.have.property('paidAmount');
        done();
      });
  });
});

describe('POST loan repayment record with invalid balance value', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/4/repayment')
      .set('Authorization', adminToken)
      .send({
        amount: '10000',
        monthlyInstallment: '22000',
        paidAmount: '80000',
        balance: 'a',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('inputs');
        res.body.error[1].should.have.property('balance');
        done();
      });
  });
});

describe('POST loan repayment record with invalid loan-id value', () => {
  it('should return an error message', (done) => {
    chai.request(app)
      .post('/api/v1/loans/s4a/repayment')
      .set('Authorization', adminToken)
      .send({
        amount: '10000',
        monthlyInstallment: '22000',
        paidAmount: '80000',
        balance: '1000',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.be.a('number');
        res.body.error[0].should.have.property('loanid');
        res.body.status.should.equal(400);
        done();
      });
  });
});

describe('GET loan repayment history', () => {
  it('should successfully get loan repayment history', (done) => {
    chai.request(app)
      .get('/api/v1/loans/3/repayments')
      .set('Authorization', userToken)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        done();
      });
  });
});
