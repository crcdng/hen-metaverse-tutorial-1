import { TezosToolkit } from '@taquito/taquito';

export class App {
  constructor (rcpClient = 'https://api.tez.ie/rpc/mainnet') {
    this.tk = new TezosToolkit(rcpClient);
  }

  init (address) { this.address = address; }

  async getBalance (address = this.address) {
    const rawBalance = await this.tk.rpc.getBalance(address);
    const balance = rawBalance.toNumber() / 1000000;
    return balance;
  }
}