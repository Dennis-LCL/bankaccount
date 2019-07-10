module.exports = class Account {
  constructor() {
    this.balance = 0;
  }
  showBalance() {
    return this.balance;
  }

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }

  withdrawal(amount) {
    if (this.balance > amount) {
      this.balance -= amount;
      return this.balance;
    } else {
      return "Not Enough Fund.";
    }
  }
};
