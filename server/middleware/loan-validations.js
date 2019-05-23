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

    if ((amount > 1000000) || (amount < 1000)) {
      verified = false;
      error.push({ amount: 'loan amount is between 1000-1000000' });
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
        error.push({ status: 'invalid parameter' });
      }
    }
    if (repaid) {
      if (!(repaid === 'true') && !(repaid === 'false')) {
        verified = false;
        error.push({ repaid: 'invalid parameter' });
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
      paidAmount,
    } = req.body;

    const {
      loanid,
    } = req.params;

    paidAmount = parseFloat(paidAmount);
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

    if (!paidAmount) {
      verified = false;
      error.push({ paidAmount: 'Paid amount must be present' });
    }

    if (paidAmount) {
      if (!(/([0-9])$/i.test(paidAmount))) {
        verified = false;
        error.push({ paidAmount: `${paidAmount} must be valid number` });
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
