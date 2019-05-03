import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

const userOne = {
  email: 'bola@gmail.com',
  firstname: 'bola',
  lastname: 'tijani',
  password: 'tijani',
  address: 'adebola ojomu str, surulere',
};

const loanOne = {
  email: 'bola@gmail.com',
  firstname: 'bola',
  lastname: 'tijani',
  tenor: 5,
  amount: 100000,
};

describe('POST api/v1/auth/signup', () => {
  it('should successfully create a user account if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(userOne)
      .end((err, res) => {
        res.status.should.equal(201);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(201);
        res.body.data.email.should.be.a('string');
        res.body.data.firstName.should.be.a('string');
        res.body.data.lastName.should.be.a('string');
        done();
      });
  });
});

describe('POST api/v1/auth/signin', () => {
  it('should successfully log user in if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'bola@gmail.com',
        password: 'tijani',
      })
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data.email.should.be.a('string');
        done();
      });
  });
});

describe('Sign in a user with invalid input values', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'teji@gmail.com',
        password: '12344',
      })
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        done();
      });
  });
});

describe('PATCH /users', () => {
  it("should update user's status as verified", (done) => {
    chai.request(app)
      .patch('/api/v1/users/bola@gmail.com/verify')
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data.status.should.equal('verified');
        res.body.data.status.should.be.a('string');
        done();
      });
  });
});

describe('Verify a user with invalid details', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .patch('/api/v1/users/teju@gmail.com/verify')
      .end((err, res) => {
        res.status.should.equal(404);
        res.body.status.should.equal(404);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        done();
      });
  });
});

describe('POST loan application', () => {
  it('should successfully create a loan applivcation if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .send(loanOne)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data.email.should.be.a('string');
        done();
      });
  });
});

describe('GET all loan application', () => {
  it('should successfully get all loan applications', (done) => {
    chai.request(app)
      .get('/api/v1/loans')
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
      .get('/api/v1/loan?repaid=true&status=approved')
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
      .get('/api/v1/loan?repaid=false&status=approved')
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

describe('PATCH /loans status', () => {
  it("should update loan's status as approved", (done) => {
    chai.request(app)
      .patch('/api/v1/loans/4')
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

describe('POST /loans repayment record', () => {
  it('should post loan repayment record in respect of a client', (done) => {
    chai.request(app)
      .post('/api/v1/loans/3/repayment')
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
        res.body.data.amount.should.be.a('string');
        res.body.data.paidAmount.should.be.a('string');
        done();
      });
  });
});

describe('GET loan repayment history', () => {
  it('should successfully get loan repayment history', (done) => {
    chai.request(app)
      .get('/api/v1/loans/3/repayments')
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
