const { emailPattern } = {
  emailPattern: /^[a-z\d]+@[a-z]+\.(com|co)[a-z]+$/,
};

const validations = {
  loans(req, res, next) {
    let verified = true;
    const error = [];

    const {
      email, tenor, firstname, lastname,
    } = req.body;

    if (!firstname || !lastname) {
      verified = false;
      error.push({ names: 'more than one name is required' });
    }

    if (firstname || lastname) {
      if (!(/^[a-z]{2,40}$/i.test(firstname))) {
        verified = false;
        error.push({ firstname: `${firstname} must be valid: only letters` });
      }

      if (!(/^[a-z]{2,40}$/i.test(lastname))) {
        verified = false;
        error.push({ firstname: `${lastname} must be valid: only letters` });
      }
    }

    if (!email || !email.trim()) {
      verified = false;
      error.push({ email: 'email must be present' });
    }

    if (!(emailPattern.test(email))) {
      verified = false;
      error.push({ email: 'email must be valid format: yorname@mail.com' });
    }

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

    balance = parseFloat(balance);
    paidAmount = parseFloat(paidAmount);
    amount = parseFloat(amount);
    monthlyInstallment = parseFloat(monthlyInstallment);

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

};

export default validations;
