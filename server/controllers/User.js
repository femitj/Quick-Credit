import service from '../services/auth';

const controllers = {
  async registerUser(req, res) {
    const response = await service.createUser(req.body);
    res.status(201).json({
      status: 201,
      data: response,
    });
  },

  async loginUser(req, res) {
    const response = await service.checkUser(req.body.email, req.body.password);
    res.status(200).json({
      status: 200,
      data: response,
    });
  },

  async updateUser(req, res) {
    const response = await service.verifyClient(req.params.useremail);
    res.status(200).json({
      status: 200,
      data: response,
    });
  },

  async ugradeUser(req, res) {
    const response = await service.upgradeClient(req.params.useremail);
    res.status(200).json({
      status: 200,
      data: response,
    });
  },
};

export default controllers;
