import { App } from './app';
const app = new App();

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#enteraddress')?.addEventListener('click', async function () {
    const address = document.querySelector('#address')?.value.trim();
    console.log(address);
    app.init(address);
  });
});

AFRAME.registerComponent('henlink', {
  schema: { url: { type: 'string' } },
  init: function () {
    console.log('registering component henlink');
  },
  update: function () {
    const url = this.data.url;
    this.el.addEventListener('click', function (evt) {
      window.open(url, '_blank');
    });
  }
});

AFRAME.registerComponent('balance', {
  schema: {},
  init: function () {
    console.log('registering component balance');
  },
  update: function () {
    this.el.addEventListener('click', async function (evt) {
      console.log('click on component balance');
      const balance = await app.getBalance();
      console.log(balance);
      const textAttribute = `${balance} Tz`;
      document.querySelector('#balancetext')?.setAttribute('value', textAttribute);
    });
  }
});

const nft = document.querySelector('#nft');
nft.setAttribute('henlink','url: https://www.hicetnunc.xyz/objkt/181212');                         

const balance = document.querySelector('#balance');
balance.setAttribute('balance','');                         

