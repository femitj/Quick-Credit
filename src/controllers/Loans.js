import db from '../models/loans';

class Loan {
  // Create loan application
  static createLoan(req, res) {
    const calcAmount = parseFloat(req.body.amount);
    const calcInterest = ((5 / 100) * calcAmount);
    const calcPaymentInstallment = parseFloat((calcAmount + calcInterest) / req.body.tenor);    
    const loan = {
      loanId: db.length + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      tenor: req.body.tenor,
      amount: calcAmount,
      paymentInstallment: calcPaymentInstallment,
      status: 'pending', // should default to pending
      balance: calcAmount,
      interest: calcInterest,
    };
    db.push(loan); // User created
    return res.status(200).json({
      status: 200,
      data: {
        id: loan.loanId,
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
}


export default Loan;
