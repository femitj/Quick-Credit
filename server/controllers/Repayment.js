const controllers = {
  async postRepayment(req, res) {
    res.status(201).json({
      status: 201,
      data: [req.data],
    });
  },
};

export default controllers;
