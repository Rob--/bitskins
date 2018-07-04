const request = require('request');
const totp = require('notp').totp;
const base32 = require('thirty-two');

class Bitskins {

  constructor(apiKey, secret, appId = 730) {
    this.apiKey = apiKey;
    this.secret = secret;
    this.appId = appId;
  }

  getCode() {
    return totp.gen(base32.decode(this.secret));
  }

  getAccountBalance() {
    return this.makeRequest('get_account_balance', body => body.data);
  }

  getAllItemPrices(simple) {
    function arrayToObject(object, item) {
      object[item.market_hash_name] = item.price;
      return object;
    }

    return this.makeRequest('get_all_item_prices', (body) => {
      if (simple) {
        body.prices = body.prices.reduce(arrayToObject, {});
      }

      return body.prices;
    });
  }

  getMarketData(names) {
    return this.makeRequest('get_price_data_for_items_on_sale', { names }, body => body.data.items);
  }

  getAccountInventory(page) {
    return this.makeRequest('get_my_inventory', body => body.data);
  }

  getInventoryOnSale(options) {
    return this.makeRequest('get_inventory_on_sale', options, body => body.data);
  }

  getSpecificItemsOnSale(item_ids) {
    return this.makeRequest('get_specific_items_on_sale', { item_ids }, body => body);
  }

  getResetPriceItems(page) {
    return this.makeRequest('get_reset_price_items', { page }, body => body.data);
  }

  getMoneyEvents(page) {
    return this.makeRequest('get_money_events', { page }, body => body.data);
  }

  moneyWithdrawal(amount, withdrawal_method) {
    return this.makeRequest('request_withdrawal', { amount, withdrawal_method }, body => body.data);
  }

  buyItem(item_ids, prices) {
    // if just one argument, allow { itemID: price }
    if (arguments.length === 1) {
      const entries = Object.entries(item_ids);
      item_ids = entries.map(pair => pair[0]);
      prices = entries.map(pair => pair[1]);
    }

    item_ids = item_ids.join(',');
    prices = prices.join(',');

    return this.makeRequest('buy_item', { item_ids, prices }, body => body.data);
  }

  sellItem(item_ids, prices) {
    // if just one argument, allow { itemID: price }
    if (arguments.length === 1) {
      const entries = Object.entries(item_ids);
      item_ids = entries.map(pair => pair[0]);
      prices = entries.map(pair => pair[1]);
    }

    item_ids = item_ids.join(',');
    prices = prices.join(',');

    return this.makeRequest('list_item_for_sale', { item_ids, prices }, body => body.data);
  }

  modifySale(item_ids, prices) {
    // if just one argument, allow { itemID: price }
    if (arguments.length === 1) {
      const entries = Object.entries(item_ids);
      item_ids = entries.map(pair => pair[0]);
      prices = entries.map(pair => pair[1]);
    }

    item_ids = item_ids.join(',');
    prices = prices.join(',');

    return this.makeRequest('modify_sale_item', { item_ids, prices }, body => body.data);
  }

  delistItem(item_ids) {
    return this.makeRequest('delist_item', { item_ids }, body => body.data);
  }

  relistItem(item_ids, prices) {

      if (arguments.length === 1) {
          const entries = Object.entries(item_ids);
          item_ids = entries.map(pair => pair[0]);
          prices = entries.map(pair => pair[1]);
      }

      item_ids = item_ids.join(',');
      prices = prices.join(',');

    return this.makeRequest('relist_item', {item_ids, prices}, body => body.data);
  }

  withdrawItem(item_ids) {
    item_ids = item_ids.join(',');
    return this.makeRequest('withdraw_item', { item_ids }, body => body.data);
  }

  bumpItem(item_ids) {
    item_ids = item_ids.join(',');
    return this.makeRequest('bump_item', { item_ids }, body => body.data);
  }

  getBuyHistory(page) {
    return this.makeRequest('get_buy_history', { page }, body => body.data);
  }

  getSellHistory(page) {
    return this.makeRequest('get_sell_history', { page }, body => body.data);
  }

  getItemHistory(page, names, delimiter) {
    return this.makeRequest('get_item_history', { page, names, delimiter }, body => body.data);
  }

  getTradeDetails(trade_token, trade_id) {
    return this.makeRequest('get_trade_details', { trade_token, trade_id }, body => body.data);
  }

  getRecentTradeOffers(active_only = true) {
    return this.makeRequest('get_recent_trade_offers', { active_only }, body => body.data);
  }

  getRecentSaleInfo(market_hash_name, page) {
    return this.makeRequest('get_sales_info', { market_hash_name, page }, body => body.data);
  }

  getRawPriceData(market_hash_name) {
    return this.makeRequest('get_steam_price_data', { market_hash_name }, body => body.data);
  }

  makeRequest(endpoint, params = {}, manipulator) {
    if (arguments.length === 2 && typeof(params) === 'function') {
      manipulator = params;
      params = {};
    }

    const query = Object.assign(params, {
      api_key: this.apiKey,
      code: this.getCode(),
      app_id: this.appId
    });

    return new Promise((resolve, reject) => {
      request({
        url: `https://bitskins.com/api/v1/${endpoint}/`,
        json: true,
        gzip: true,
        qs: query,
      }, (err, res, body) => {
        if (err || body.status !== 'success') {
          reject(err || body);
          return;
        }

        if (typeof(manipulator) === 'function') {
          resolve(manipulator(body));
        } else {
          resolve(body);
        }
      });
    })
  }
}

module.exports = Bitskins;