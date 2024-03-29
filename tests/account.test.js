const Account = require("../src/account");
const MockDate = require("mockdate");

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
    myAccount.deposit(100);
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

describe("Statement", () => {
  it("should show date, debit, credit and balance for new account", () => {
    const myAccount = new Account();
    MockDate.set("2019-7-10");
    const myStatement = myAccount.statement();
    expect(myStatement).toMatchObject([
      { date: "Wed Jul 10 2019", debitCredit: 0, balance: 0 }
    ]);
  });

  it("should list down one deposit if I make one deposit, with the deposited amount and balance.", () => {
    const myAccount = new Account();
    const expectedStatement = [
      { date: "Wed Jul 10 2019", debitCredit: 100, balance: 100 }
    ];

    MockDate.set("2019-7-10");
    myAccount.deposit(100);
    const myStatement = myAccount.statement();
    expect(myStatement).toMatchObject(expectedStatement);
  });

  it("should list down two deposits if I make two deposits, with the deposited amount.", () => {
    const myAccount = new Account();
    const expectedStatement = [
      { date: "Wed Jul 10 2019", debitCredit: 100, balance: 100 },
      { date: "Thu Jul 11 2019", debitCredit: 100, balance: 200 }
    ];

    MockDate.set("2019-7-10");
    myAccount.deposit(100);
    MockDate.set("2019-7-11");
    myAccount.deposit(100);
    const myStatement = myAccount.statement();
    expect(myStatement).toMatchObject(expectedStatement);
  });

  it("should list down one deposits and one withdrawal in my statement, if I make 100 deposit and 50 withdrawal  .", () => {
    const myAccount = new Account();
    const expectedStatement = [
      { date: "Wed Jul 10 2019", debitCredit: 100, balance: 100 },
      { date: "Thu Jul 11 2019", debitCredit: -50, balance: 50 }
    ];

    MockDate.set("2019-7-10");
    myAccount.deposit(100);
    MockDate.set("2019-7-11");
    myAccount.withdrawal(50);
    const myStatement = myAccount.statement();
    expect(myStatement).toMatchObject(expectedStatement);
  });

  it("should not show a failed withdrawal in the statement.", () => {
    const myAccount = new Account();
    const expectedStatement = [
      { date: "Wed Jul 10 2019", debitCredit: 100, balance: 100 },
      { date: "Thu Jul 11 2019", debitCredit: -50, balance: 50 }
    ];

    MockDate.set("2019-7-10");
    myAccount.deposit(100);
    MockDate.set("2019-7-11");
    myAccount.withdrawal(50);
    MockDate.set("2019-7-12");
    myAccount.withdrawal(100);
    const myStatement = myAccount.statement();
    expect(myStatement).toMatchObject(expectedStatement);
  });
});
