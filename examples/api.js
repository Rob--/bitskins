const Bitskins = require('./index');

const API = new Bitskins.API('apiKey', 'bitskinsSecret');

// https://bitskins.com/api#get_account_balance
API.getAccountBalance().then((data) => {
  console.log(data);
  /*
   * { available_balance: '13370.420',
   *   pending_withdrawals: '0.0000',
   *   withdrawable_balance: '13370.420',
   *   couponable_balance: '13370.420' }
   */
})

// https://bitskins.com/api#get_money_events
API.getMoneyEvents(3 /* page number optional */).then((data) => {
  console.log(data);
  /*
   * { events: [{
   *     type: 'sale fee',
   *     medium: 'CS:GO items',
   *     amount: '37.7427',
   *     pending: false,
   *     description: '733v530871a122ddda3ddd3983b3355433d8d4e9c4f5f',
   *     time: 1486540016
   *   }, {
   *     type: 'item sold',
   *     medium: {
   *       market_hash_name: 'AWP | Medusa (Well-Worn)',
   *       app_id: '730',
   *       context_id: '2',
   *       class_id: '912222924',
   *       instance_id: '311045390'
   *     },
   *     price: '778.2000',
   *     time: 1486540016
   *   }],
   *   page: 3 }
   */
})

// https://bitskins.com/api#buy_item
API.buyItem([ 10564097220, 10564097263 ], [ 0.5, 0.01 ]).then((data) => {
  console.log(data);
  /*
   * { items: [{
   *     app_id: '730',
   *     context_id: '2',
   *     item_id: '123641644157',
   *     class_id: '993311319',
   *     instance_id: '519977149',
   *     market_hash_name: 'G3SG1 | Orange Kimono (Well-Worn)',
   *     price: '0.05'
   *   }],
   *     trade_tokens: [ '45d4c690482564a3' ]
   * }
   */
}).catch((data) => {
  console.log(data);
  // { status: '500', error: 'Internal Server Error' }
})
