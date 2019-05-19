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

describe('POST loan application', () => {
  it('should successfully create a loan application if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send(loanOne)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(201);
        res.body.data.email.should.be.a('string');
        done();
      });
  });
});


describe('POST loan application with empty tenor fields', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola',
        lastname: 'tijani',
        tenor: '',
        amount: 100000,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('tenor');
        done();
      });
  });
});

describe('POST loan application with invalid tenor fields', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .set('Authorization', userToken)
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola',
        lastname: 'tijani',
        tenor: '354',
        amount: 100000,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('tenor');
        done();
      });
  });
});

describe('GET all loan application', () => {
  it('should successfully get all loan applications', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('array');
        done();
      });
  });
});

describe('GET all repaid loan application', () => {
  it('should successfully get all repaid loan records', (done) => {
    chai.request(app)
      .get('/api/v1/loans?repaid=true&status=approved')
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('array');
        done();
      });
  });
});

describe('GET all current loan application', () => {
  it('should successfully get all current loan records', (done) => {
    chai.request(app)
      .get('/api/v1/loans?repaid=false&status=approved')
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data.should.be.a('array');
        done();
      });
  });
});

describe('GET a specific loan application', () => {
  it('should successfully get a specific loan record', (done) => {
    chai.request(app)
      .get('/api/v1/loans/3')
      .set('Authorization', adminToken)
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

describe('GET a specific loan application with a wrong ID', () => {
  it('should return an error message', (done) => {
    chai.request(app)
      .get('/api/v1/loans/9')
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(404);
        done();
      });
  });
});

describe('GET a specific loan application with a wrong ID', () => {
  it('should return an error message', (done) => {
    chai.request(app)
      .get('/api/v1/loans/s9a')
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.status.should.be.a('number');
        res.body.error[0].should.have.property('id');
        res.body.status.should.equal(400);
        done();
      });
  });
});

describe('PATCH /loans status', () => {
  it("should update loan's status as approved", (done) => {
    chai.request(app)
      .patch('/api/v1/loans/2')
      .set('Authorization', adminToken)
      .send({
        status: 'approved',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data.status.should.equal('approved');
        res.body.data.status.should.be.a('string');
        done();
      });
  });
});
