import db from '../models/loans';
import repaymentdb from '../models/loanRepaymentRecord';
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
        error: 'All loans repaid',
      });
    }
    // Current loans found
    return res.status(200).json({
      status: 200,
      data: currentLoans,
    });
  }

  // Get a specific loan application
  static getLoan(req, res) {
    const loan = db.find(c => c.id === parseInt((req.params.id), 10));
    // specific loan not found
    if (!loan) {
      return res.status(404).json({
        status: 404,
        error: `loan with id:${req.params.id} not found`,
      });
    }
    // specific loan found
    return res.status(200).json({
      status: 200,
      data: loan,
    });
  }

  // Patch a client's loan application
  static updateLoanStatus(req, res) {
    // request params for loanid
    const requestLoanId = req.params.loanid;
    const newStatus = req.body.status;
    // search for loan with loan-id
    const loan = db.find(c => (c.id === parseInt((requestLoanId), 10)));
    // Update loan status
    loan.status = newStatus;
    return res.status(200).json({
      status: 200,
      data: {
        loanId: loan.id,
        loanAmount: loan.amount,
        tenor: loan.tenor,
        status: loan.status,
        monthlyInstallment: loan.paymentInstallment,
        interest: loan.interest,
        user: loan.user,
      },
    });
  }

  // Create a loan repayment record
  static createLoanRepayment(req, res) {
    // request params for loanid
    const requestLoanId = req.params.loanid;
    const loanRepayment = {
      id: repaymentdb.length + 1,
      createdOn: new Date(),
      loanId: Number(requestLoanId),
      amount: parseFloat(req.body.amount),
      monthlyInstallment: parseFloat(req.body.monthlyInstallment),
      paidAmount: parseFloat(req.body.paidAmount),
      balance: parseFloat(req.body.balance),
    };
    repaymentdb.push(loanRepayment);
    return res.status(201).json({
      status: 201,
      data: {
        id: loanRepayment.id,
        loanId: loanRepayment.loanId,
        createdOn: loanRepayment.createdOn,
        amount: loanRepayment.amount,
        monthlyInstallment: loanRepayment.monthlyInstallment,
        paidAmount: loanRepayment.paidAmount,
        balance: loanRepayment.balance,
      },
    });
  }

  // Get loan repayment history
  static getRepaymentHistory(req, res) {
    const record = repaymentdb.find(c => c.loanId === parseInt((req.params.loanid), 10));
    //  loan history not found
    if (!record) {
      return res.status(404).json({
        status: 404,
        error: `loan with id:${req.params.loanid} not found`,
      });
    }
    // loan repayment history found
    return res.status(200).json({
      status: 200,
      data: {
        loanId: record.loanId,
        createdOn: record.createdOn,
        monthlyInstallment: record.monthlyInstallment,
        amount: record.amount,
        paidAmount: record.paidAmount,
        balance: record.balance,
      },
    });
  }
}


export default Loan;
