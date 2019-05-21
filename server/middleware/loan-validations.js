const validations = {
  loans(req, res, next) {
    let verified = true;
    const error = [];

    const {
      tenor, amount,
    } = req.body;

    if (!tenor) {
      verified = false;
      error.push({ tenor: 'tenor must be present' });
    }

    if (tenor) {
      if (!(/^(1[0-2]|[1-9])$/i.test(tenor))) {
        verified = false;
        error.push({ tenor: `${tenor} must be valid month: between 1-12 months, a number` });
      }
    }

    if (!amount) {
      verified = false;
      error.push({ tenor: 'tenor must be present' });
    }

    if (amount) {
      if (!(/([0-9])$/i.test(amount))) {
        verified = false;
        error.push({ amount: `${amount} must be valid number` });
      }
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },

  queryChecker(req, res, next) {
    let verified = true;
    const error = [];
    const { status, repaid } = req.query;
    
    if (!repaid && !status) {
      return next();
    }
    if (status) {
      if (!(status === 'approved') && !(status === 'pending') && !(status === 'rejected')) {
        verified = false;
        error.push({ status: 'invalid details' });
      }
    }
    if (repaid) {
      if (!(repaid === 'true') && !(repaid === 'false')) {
        verified = false;
        error.push({ repaid: 'invalid details' });
      }
    }
    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }
    return next();
  },

  loanRepayment(req, res, next) {
    let verified = true;
    const error = [];

    let {
      amount, paidAmount, balance, monthlyInstallment,
    } = req.body;

    const {
      loanid,
    } = req.params;

    balance = parseFloat(balance);
    paidAmount = parseFloat(paidAmount);
    amount = parseFloat(amount);
    monthlyInstallment = parseFloat(monthlyInstallment);
    if (!loanid) {
      verified = false;
      error.push({ loanid: 'loan-id must be present' });
    }

    if (loanid) {
      if (!(/([0-9])$/i.test(loanid))) {
        verified = false;
        error.push({ loanid: `${loanid} must be valid number` });
      }
    }

    if (!amount || !paidAmount || !balance || !monthlyInstallment) {
      verified = false;
      error.push({ inputs: 'all fields must be present' });
    }

    if (amount || paidAmount || balance || monthlyInstallment) {
      if (!(/([0-9])$/i.test(amount))) {
        verified = false;
        error.push({ amount: `${amount} must be valid number` });
      }

      if (!(/([0-9])$/i.test(paidAmount))) {
        verified = false;
        error.push({ paidAmount: `${paidAmount} must be valid number` });
      }

      if (!(/([0-9])$/i.test(balance))) {
        verified = false;
        error.push({ balance: `${balance} must be valid number` });
      }

      if (!(/([0-9])$/i.test(monthlyInstallment))) {
        verified = false;
        error.push({ monthlyInstallment: `${monthlyInstallment} must be valid number` });
      }
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },

  validateParams(req, res, next) {
    let verified = true;
    const error = [];

    const {
      id,
    } = req.params;

    if (!id) {
      verified = false;
      error.push({ id: 'id must be present' });
    }

    if (id) {
      if (!(/([0-9])$/i.test(id))) {
        verified = false;
        error.push({ id: `${id} must be valid number` });
      }
    }

    if (!verified) {
      return res.status(400).json({
        status: 400,
        error,
      });
    }

    return next();
  },

};

export default validations;
