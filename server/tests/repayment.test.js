import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

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
        adminToken = body.data.token;
        done();
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  it('should successfully log admin in if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'tjhakeemus@gmail.com',
        password: '123456789',
      })
      .end((err, res) => {
        const { body } = res;
        // eslint-disable-next-line prefer-destructuring
        userToken = body.data.token;
        done();
      });
  });
});

describe('POST /loans repayment record', () => {
  it('should post loan repayment record in respect of a client', (done) => {
    chai.request(app)
      .post('/api/v1/loans/1/repayment')
      .set('Authorization', adminToken)
      .send({
        paidAmount: '80000',
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

describe('POST /loans repayment record with a fully repaid', () => {
  it('should expect error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/2/repayment')
      .set('Authorization', adminToken)
      .send({
        paidAmount: '80000',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
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
        paidAmount: '',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('paidAmount');
        done();
      });
  });
});

// describe('POST loan repayment record with no loanid params', () => {
//   it('should return an error', (done) => {
//     chai.request(app)
//       .post('/api/v1/loans//repayment')
//       .set('Authorization', adminToken)
//       .send({
//         paidAmount: '2000',
//       })
//       .end((err, res) => {
//         res.status.should.equal(404);
//         res.body.should.be.a('object');
//         res.body.should.have.property('status');
//         res.body.status.should.be.a('number');
//         res.body.status.should.equal(404);
//         res.body.error[0].should.have.property('loanid');
//         done();
//       });
//   });
// });


describe('POST loan repayment record with invalid monthly installment value', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/2/repayment')
      .set('Authorization', adminToken)
      .send({
        paidAmount: 'femi80000',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('paidAmount');
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
        paidAmount: 'a',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('paidAmount');
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
        paidAmount: 'a',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('paidAmount');
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
        paidAmount: '80000',
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
      .get('/api/v1/loans/2/repayments')
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

describe('GET loan repayment history thats belongs to another', () => {
  it('return error', (done) => {
    chai.request(app)
      .get('/api/v1/loans/1/repayments')
      .set('Authorization', userToken)
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(403);
        done();
      });
  });
});
