const Account = require("../src/account");

describe("Balance", () => {
  it("should show 0 when the balance in the account is 0", () => {
    const myAccount = new Account();
    const currentBalance = myAccount.showBalance();
    expect(currentBalance).toEqual(0);
  });
});

describe("Deposit", () => {
  it("should show 100 on the balance when I make 100 deposit", () => {
    const myAccount = new Account();
    const newDeposit = myAccount.deposit(100);
    const currentBalance = myAccount.showBalance();
    expect(currentBalance).toEqual(100);
  });

  it("should show 200 on the balance when I already have 100 in the balance and deposit another 100", () => {
    const myAccount = new Account();
    myAccount.deposit(100);
    myAccount.deposit(100);
    const currentBalance = myAccount.showBalance();
    expect(currentBalance).toEqual(200);
  });
});

describe("Withdrawal", () => {
  it("should show 50 on the balance when I have starting balance of 100 and I make 50 withdrawal", () => {
    const myAccount = new Account();
    myAccount.deposit(100);
    myAccount.withdrawal(50);
    const currentBalance = myAccount.showBalance();
    expect(currentBalance).toEqual(50);
  });

  it("should show 'Not Enough Fund' when I withdrawl 100 when my balance is only 50", () => {
    const myAccount = new Account();
    myAccount.deposit(50);
    const responseMessage = myAccount.withdrawal(100);
    expect(responseMessage).toEqual("Not Enough Fund.");
  });
});
