import 'babel-polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server/index';

chai.use(chaiHttp);
chai.should();

const userOne = {
  email: 'bola@gmail.com',
  firstname: 'bola',
  lastname: 'tijani',
  password: 'tijani123',
  address: 'adebola ojomu str, surulere',
};

let adminToken;

// authentication routes tests

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
        const { user } = res.body.data[0];
        user.email.should.be.a('string');
        user.firstname.should.be.a('string');
        user.lastname.should.be.a('string');
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
        const { user } = res.body.data[0];
        // eslint-disable-next-line prefer-destructuring
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        user.email.should.be.a('string');
        done();
      });
  });
});

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


describe('Sign in a user with invalid input values', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'teji@gmail.com',
        password: '12344567',
      })
      .end((err, res) => {
        res.status.should.equal(400);
        res.body.status.should.equal(400);
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
      .set('Authorization', adminToken)
      .end((err, res) => {
        res.status.should.equal(200);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('data');
        res.body.status.should.be.a('number');
        res.body.status.should.equal(200);
        res.body.data[0].status.should.equal('verified');
        res.body.data[0].status.should.be.a('string');
        done();
      });
  });
});

describe('Verify a user with invalid details', () => {
  it('Should return an error', (done) => {
    chai.request(app)
      .patch('/api/v1/users/teju@gmail.com/verify')
      .end((err, res) => {
        res.status.should.equal(403);
        res.body.status.should.equal(403);
        res.body.should.be.a('object');
        res.body.error.should.be.a('string');
        done();
      });
  });
});
