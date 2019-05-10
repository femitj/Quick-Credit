import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp);
chai.should();

const userOne = {
  email: 'bola@gmail.com',
  firstname: 'bola',
  lastname: 'tijani',
  password: 'tijani123',
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

describe('Sign up a user with invalid email format', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'bolagmail.com',
        firstname: 'bola',
        lastname: 'tijani',
        password: 'tijani123',
        address: 'adebola ojomu str, surulere',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('email');
        done();
      });
  });
});

describe('Sign up a user with invalid name format', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola7',
        lastname: 'tijani',
        password: 'tijani123',
        address: 'adebola ojomu str, surulere',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('firstname');
        done();
      });
  });
});

describe('Sign up a user with invalid email format', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola',
        lastname: 'tijani23',
        password: 'tijani123',
        address: 'adebola ojomu str, surulere',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('lastname');
        done();
      });
  });
});

describe('Sign up a user with empty email value', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: '',
        firstname: 'bola',
        lastname: 'tijani',
        password: 'tijani123',
        address: 'adebola ojomu str, surulere',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('email');
        done();
      });
  });
});

describe('Sign up a user with invalid password format', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola',
        lastname: 'tijani',
        password: 'tija',
        address: 'adebola ojomu str, surulere',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('password');
        done();
      });
  });
});

describe('Sign up a user with empty password', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola',
        lastname: 'tijani',
        password: '',
        address: 'adebola ojomu str, surulere',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('password');
        done();
      });
  });
});

describe('Sign up a user with missing name value', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'bolagmail.com',
        firstname: 'bola',
        lastname: '',
        password: 'tijani123',
        address: 'adebola ojomu str, surulere',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('names');
        done();
      });
  });
});

describe('Sign up a user with empty address value', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola',
        lastname: 'tijani',
        password: 'tijani123',
        address: '',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('address');
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
        password: 'tijani123',
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
        password: '12344567',
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

describe('Sign in a user with invalid email format', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'tejigmail.com',
        password: '12344567',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('email');
        done();
      });
  });
});

describe('Sign in a user with empty email value', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: '',
        password: '12344567',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('email');
        done();
      });
  });
});

describe('Sign in a user with invalid password format', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'teji@gmail.com',
        password: '',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.error[0].should.have.property('password');
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

describe('POST loan application with empty name fields', () => {
  it('should successfully create a loan applivcation if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .send({
        email: 'bola@gmail.com',
        firstname: '',
        lastname: '',
        tenor: 5,
        amount: 100000,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('names');
        done();
      });
  });
});

describe('POST loan application with empty email fields', () => {
  it('should successfully create a loan applivcation if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .send({
        email: '',
        firstname: 'tijani',
        lastname: 'femi',
        tenor: 5,
        amount: 100000,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('email');
        done();
      });
  });
});

describe('POST loan application with empty tenor fields', () => {
  it('should successfully create a loan applivcation if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
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
  it('should successfully create a loan applivcation if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
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

describe('POST loan application with invalid name fields', () => {
  it('should successfully create a loan applivcation if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola22',
        lastname: 'tijani',
        tenor: '6',
        amount: 100000,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('firstname');
        done();
      });
  });
});

describe('POST loan application with invalid name fields', () => {
  it('should successfully create a loan applivcation if inputs are valid', (done) => {
    chai.request(app)
      .post('/api/v1/loans')
      .send({
        email: 'bola@gmail.com',
        firstname: 'bola',
        lastname: 'tijani21',
        tenor: '6',
        amount: 100000,
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(400);
        res.body.error[0].should.have.property('lastname');
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
        done();
      });
  });
});


describe('POST loan repayment record with invalid amount fields', () => {
  it('should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/loans/4/repayment')
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
      .post('/api/v1/loans/4/repayment')
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
      .post('/api/v1/loans/4/repayment')
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
