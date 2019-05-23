const controllers = {
  async registerUser(req, res) {
    res.status(201).json({
      status: 201,
      data: req.data,
    });
  },

  async loginUser(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  async updateUser(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  async ugradeUser(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

  async getUsers(req, res) {
    res.status(200).json({
      status: 200,
      data: req.data,
    });
  },

};

export default controllers;
