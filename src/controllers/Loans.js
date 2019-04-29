import db from '../models/loans';
import Helper from '../helpers/Helper';

class Loan {
  // Create loan application
  static createLoan(req, res) {
    const calcAmount = parseFloat(req.body.amount);
    const calcInterest = ((5 / 100) * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / req.body.tenor);    
    const loan = {
      id: db.length + 1,
      user: req.body.email,
      createdOn: new Date(),
      tenor: req.body.tenor,
      amount: calcAmount,
      paymentInstallment: calcPaymentInstallment,
      status: 'pending', // should default to pending
      balance: calcAmount,
      interest: calcInterest,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
    };
    db.push(loan); // User created
    return res.status(200).json({
      status: 200,
      data: {
        loanId: loan.id,
        firstName: loan.firstname,
        lastName: loan.lastname,
        email: loan.email,
        tenor: loan.tenor,
        amount: loan.amount,
        paymentInstallment: loan.paymentInstallment,
        status: loan.status, // should default to pending
        balance: loan.balance,
        interest: loan.interest,
      },
    });
  }

  // Get all loans
  static getAllLoans(req, res) {
    return res.status(200).json({
      status: 200,
      message: 'All loan applicatioin record successfully retrieved',
      data: db,
    });
  }

  // Get all repaid loans
  static getRepaidLoans(req, res) {
    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const paramsDetails = Helper.getParams(eachParamArray);
    const repaidLoans = db.filter(check => (check.status === paramsDetails.status && check.repaid === Boolean(paramsDetails.repaid)));
    // Repaid loans not found
    if (!repaidLoans) {
      return res.status(404).json({
        status: 404,
        error: 'No loan repaid',
      });
    }
    // Repaid loans found
    return res.status(200).json({
      status: 200,
      data: repaidLoans,
    });
  }

  // Get all current loans
  static getCurrentLoans(req, res) {
    const paramsString = req.url.split('?')[1];
    const eachParamArray = paramsString.split('&');
    const paramsDetails = Helper.getParams(eachParamArray);
    const currentLoans = db.filter(check => (check.status === paramsDetails.status && String(check.repaid) === paramsDetails.repaid));
    // Current loans not found
    if (!currentLoans) {
      return res.status(404).json({
        status: 404,
        error: 'No loan repaid',
      });
    }
    // Current loans found
    return res.status(200).json({
      status: 200,
      data: currentLoans,
    });
  }

  // get a specific loan application
  static getLoan(req, res) {
    const loan = db.find(c => c.id === parseInt((req.params.id), 10));
    // specific loan not found
    if (!loan) {
      return res.status(404).json({
        status: 404,
        error: 'Political office not found',
      });
    }
    // specific loan found
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }
}


export default Loan;
