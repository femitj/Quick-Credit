import service from '../services/repayment';

const controllers = {
  async postRepayment(req, res) {
    const response = await service.createRepaymentRecord(req.body, req.params.loanid);
    res.status(201).json({
      status: 201,
      data: response,
    });
  },
  async getRepayment(req, res) {
    const response = await service.getRepayment(req.params.loanid);
    res.status(200).json({
      status: 200,
      data: response,
    });
  },
};

export default controllers;
