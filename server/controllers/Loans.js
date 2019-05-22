import service from '../services/loans';

const controllers = {
  async postLoan(req, res) {
    const response = await service.createLoans(req.body, req.user);
    res.status(201).json({
      status: 201,
      data: response,
    });
  },
  async getLoans(req, res) {
    const response = await service.getLoans(req.query);
    res.status(200).json({
      status: 200,
      data: response,
    });
  },
  async getLoan(req, res) {
    const response = await service.getLoan(req.params.id);
    res.status(200).json({
      status: 200,
      data: response,
    });
  },
  async updateLoanStatus(req, res) {
    const response = await service.updateStatus(req.body.status, req.params.id);
    res.status(200).json({
      status: 200,
      data: response,
    });
  },
};

export default controllers;
