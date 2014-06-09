myWallet
========

blockchain.info My Wallet API for node.js

[npm package](https://npmjs.org/package/mywallet)

Documentation
=============

```javascript
var mywallet = require("mywallet");
var sampleWallet = new mywallet({
  guid: "SECRET",
  password: "SECRET"
});
```

### Make outgoing payments
```javascript
sampleWallet.payment({
  // if double encryption is enabled
  second_password: "SECRET",
  // recipients bitcoin address
  to: "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN",
  // amount to send in satoshi
  amount: 10000,
  // send from a specific bitcoin address *optional*
  from: "14D3Y424biYtx8RyJXQGtaNvDFhWGSJmxc",
  // "true" or "false" indicating whether the transaction should be sent through a shared wallet. fees apply *optional*
  shared: true,
  // transaction fee value in satoshi *optional*
  fee: 1000,
  // a public note to include with the transaction *optional*
  note: "i love you"
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "message": "Sent 0.1 BTC to 1A8JiWcwvpY7tAopUkSnGuEYHmzGYfZPiq",
   *    "tx_hash": "f322d01ad784e5deeb25464a5781c3b20971c1863679ca506e702e3e33c18e9c",
   *    "notice": "Some funds are pending confirmation and cannot be spent yet (Value 0.001 BTC)"
   *  }
   */
});
```

### Send many transactions
```javascript
sampleWallet.multiplePayments({
  // if double encryption is enabled
  second_password: "SECRET",
  // recipients bitcoin addresses and amount to send
  to: {
    "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN": 10000,
    "14D3Y424biYtx8RyJXQGtaNvDFhWGSJmxc": 10000
  },
  // send from a specific bitcoin address *optional*
  from: "12BpKnhWAVUtExZYyZGiucaaKQ56UviMYw",
  //  "true" or "false" indicating whether the transaction should be sent through a shared wallet. fees apply
  shared: true,
  // transaction fee value in satoshi *optional*
  fee: 1000,
  // a public note to include with the transaction *optional*
  note: "i love you"
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "message" : "Sent To Multiple Recipients",
   *    "tx_hash" : "f322d01ad784e5deeb25464a5781c3b20971c1863679ca506e702e3e33c18e9c"
   *  }
   */
});
```

### Fetching the wallet balance
```javascript
sampleWallet.getBalance(function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "balance": 1000
   *  }
   */
});
```

### Listing addresses
```javascript
sampleWallet.getAddresses({
  // the minimum number of confirmations transactions must have before being included in balance of addresses *optional*
  confirmations: 50
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "addresses": [
   *      {
   *        "balance": 1400938800,
   *        "address": "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN",
   *        "label": "SMS Deposits",
   *        "total_received": 5954572400
   *      },
   *      {
   *        "balance": 79434360,
   *        "address": "14D3Y424biYtx8RyJXQGtaNvDFhWGSJmxc",
   *        "label": "My Wallet",
   *        "total_received": 453300048335
   *      },
   *      {
   *        "balance": 0,
   *        "address": "12BpKnhWAVUtExZYyZGiucaaKQ56UviMYw",
   *        "total_received": 0
   *      }
   *    ]
   *  }
   */
});
```

### Getting the balance of an address
```javascript
sampleWallet.getAddressBalance({
  // the bitcoin address to lookup
  address: "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN",
  // minimum number of confirmations required. 0 for unconfirmed
  confirmations: 50
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "balance": 10000,
   *    "address": "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN",
   *    "total_received": 1000000
   *  }
   */
});
```

### Generating a new address
```javascript
sampleWallet.generateAddress({
  // if double encryption is enabled
  second_password: "SECRET",
  // an optional label to attach to this address
  label: "test address"
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "address": "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN",
   *    "label":  "test address"
   *  }
   */
});
```

### Archiving an address
```javascript
sampleWallet.archiveAddress({
  // if double encryption is enabled
  second_password: "SECRET",
  // the bitcoin address to archive
  address: "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN"
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "archived": "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN"
   *  }
   */
});
```

### Unarchive an address
```javascript
sampleWallet.unarchiveAddress({
  // if double encryption is enabled
  second_password: "SECRET",
  // the bitcoin address to unarchive
  address: "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN"
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "active": "1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN"
   *  }
   */
});
```

### Consolidating addresses
```javascript
sampleWallet.consolidate({
  // if double encryption is enabled
  second_password: "SECRET",
  // sddresses which have not received any transactions in at least this many days will be consolidated
  days: "7"
}, function(err, res) {
  if(err) throw err;
  /*
   * response could be:
   *  {
   *    "consolidated": ["1AxqCZjGRwRNzqCvQyUEaFN5auxVbWBfdN"]
   *  }
   */
});
```

## Satoshi

### Satoshi to bitcoin
```javascript
var btc = sampleWallet.satoshiToBtc(10000);
```

### Bitcoin to satoshi
```javascript
var satoshi = sampleWallet.btcToSatoshi(1);
```