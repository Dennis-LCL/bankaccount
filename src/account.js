module.exports = class Account {
  constructor() {
    this.balance = 0;
    this.transactionHistory = [];
  }
  showBalance() {
    return this.balance;
  }

  deposit(amount) {
    const newObject = {
      date: new Date().toDateString(),
      debitCredit: amount,
      balance: (this.balance += amount)
    };
    this.transactionHistory.push(newObject);
    return this.balance;
  }

  withdrawal(amount) {
    if (this.balance > amount) {
      const newObject = {
        date: new Date().toDateString(),
        debitCredit: -amount,
        balance: (this.balance -= amount)
      };
      this.transactionHistory.push(newObject);
      return this.balance;
    } else {
      return "Not Enough Fund.";
    }
  }

  statement() {
    if (this.transactionHistory.length === 0) {
      const emptyTransaction = [
        {
          date: "",
          debitCredit: 0,
          balance: this.balance
        }
      ];
      return emptyTransaction;
    } else {
      console.log(this.transactionHistory);
      return this.transactionHistory;
    }
  }
};
