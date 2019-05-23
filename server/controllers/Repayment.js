const controllers = {
  async postRepayment(req, res) {
    res.status(201).json({
      status: 201,
      data: req.data,
    });
  },
  async getRepayment(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },
};

export default controllers;
