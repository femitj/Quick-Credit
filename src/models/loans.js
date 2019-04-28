const loans = [
  {
    id: 1,
    user: 'seun@gmail.com',
    createdOn: Date(),
    tenor: '5 months',
    amount: 100000,
    paymentInstallment: 21000,
    status: 'approved', // should default to pending
    repaid: true,
    balance: 0,
    interest: 5000,
    firstName: 'seun',
    lastName: 'Tijani',
    email: 'seun@gmail.com',
  },
  {
    id: 2,
    user: 'bola@gmail.com',
    createdOn: Date(),
    tenor: '5 months',
    amount: 100000,
    paymentInstallment: 21000,
    status: 'pending', // should default to pending
    repaid: false,
    balance: 0,
    interest: 5000,
    firstName: 'bola',
    lastName: 'Tijani',
    email: 'bola@gmail.com',
  },
  {
    id: 3,
    user: 'bayo@gmail.com',
    createdOn: Date(),
    tenor: '5 months',
    amount: 100000,
    paymentInstallment: 21000,
    status: 'approved', // should default to pending
    repaid: true,
    balance: 0,
    interest: 5000,
    firstName: 'bayo',
    lastName: 'Tijani',
    email: 'bayo@gmail.com',
  },
];

export default loans;
