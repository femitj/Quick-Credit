const controllers = {
  async postLoan(req, res) {
    res.status(201).json({
      status: 201,
      data: [req.data],
    });
  },
  getAllLoans(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },
};

export default controllers;
