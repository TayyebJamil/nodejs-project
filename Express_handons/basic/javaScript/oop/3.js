class BankAccount {
  #balance = 0;
  constructor(owner) {
    this.owner = owner
  }
  deposit(amount){
    this.#balance += amount;
    console.log(`Deposit ${amount} to ${this.owner}`);
  }
  withdraw(amount){
    if (this.#balance >= amount) {
      this.#balance -= amount;
      console.log(`Withdraw ${amount} from ${this.owner}`);
    } else {
      console.log(`Insufficient funds for ${this.owner}`);
    }
  }
  getBalance(){
    return this.#balance;
  }
} 
const account = new BankAccount('Tayyeb');
account.deposit(1000);
account.withdraw(500);
console.log(account.getBalance());