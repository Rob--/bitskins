## bitskins

A wrapper for the BitSkins API and Web Sockets.

```javascript
const Bitskins = require('bitskins');

const api = new Bitskins.API(apiKey, bitskinsSecret);
const sockets = new BitSkins.WebSocket();
```

## Installation
```javascript
$ npm install bitskins
```

## Features
- 100% coverage of the Bitskins API
- full compatibility with Bitskins' web sockets

## API

To make a call, you need to initiate the Bitskins.API class by passing
it your Bitskins API key which can be retrieved [here](https://bitskins.com/settings)
and by passing your Bitskins secret which is given to you when enabling 2FA
on your Bitskins account.

For more information, visit the [Bitskins API docs](https://bitskins.com/api).

 All calls return a promise with the data from the response. If there is
 an error making the request or the status of the request from Bitskins
 is not "success" the promise will be rejected.

 ```javascript
 api.getAccountBalance()
     .then((data) => {
         // ...
     })
     .catch((error) => {
         // this will be the response from the Bitskins API call if the actual
         // request was successful but the API returned a status that was not "success",
         // or it will be the error from the `request` module if the actual request failed.
     });
 ```

For a full example, look at the examples folder.

### getAccountBalance() | [doc ref](https://bitskins.com/api#get_account_balance)
Allows you to retrieve your available and pending balance in all currencies supported by BitSkins.

### getAllItemPrices([simple]) | [doc ref](https://bitskins.com/api#get_all_item_prices)
Allows you to retrieve the entire price database used at BitSkins.

- simple (optional): boolean, if true it will simplify the response and give
you the price data in the format `{ name: price, name: price }`

### getMarketData([names]) | [doc ref](https://bitskins.com/api#get_price_data_for_items_on_sale)
Allows you to retrieve basic price data for items currently on sale at BitSkins.

- names (optional): An array of market hash names. A filter to only return
data about certain items.

### getAccountInventory([page]) | [doc ref](https://bitskins.com/api#get_my_inventory)
Allows you to retrieve your account's available inventory on Steam (items listable for sale), your BitSkins inventory (items currently on sale), and your pending withdrawal inventory (items you delisted or purchased).

- page (optional): the page number of the Bitskins inventory.

### getInventoryOnSale([options]) | [doc ref](https://bitskins.com/api#get_inventory_on_sale)
Allows you to retrieve the BitSkins inventory currently on sale. This includes items you cannot buy (i.e., items listed for sale by you). By default, upto 24 items per page, and optionally up to 480 items per page. This method allows you to search the inventory just as the search function on the website allows you to search inventory.

- options (optional): the following object:
  - page: page number
  - sort_by: either `created_at`, `price`, or `wear_value`
  - order: either `desc` or `asc`
  - market_hash_name: full or partial item name
  - min_price: minimum price
  - max_price: maxiumum price
  - has_stickers: either `-1`, `0` or `1`
  - is_stattrak: either `-1`, `0` or `1`
  - is_souvenir: either `-1`, `0` or `1`
  - per_page: number of results per page, must be between 24 and 480

  Reference the [official documentation](https://bitskins.com/api#get_inventory_on_sale)
  for this endpoint to test the request.

### getSpecificItemsOnSale(item_ids) | [doc ref](https://bitskins.com/api#get_specific_items_on_sale)
Allows you to retrieve data for specific Item IDs that are currently on sale. To gather Item IDs you wish to track/query, see the 'Get Inventory on Sale' API call for items currently on sale.

- item_ids: an array of ids belonging to items on sale, 250 ids max

### getResetPriceItems([page]) | [doc ref](https://bitskins.com/api#get_reset_price_items)
Returns a paginated list of items that need their prices reset. Items need prices reset when Steam changes tracker so we are unable to match specified prices to the received items when you list them for sale. Upto 24 items per page. Items that need price resets always have the reserved price of 4985.11.

- page (optional): page number

### getMoneyEvents([page]) | [doc ref](https://bitskins.com/api#get_money_events)
Allows you to retrieve historical events that caused changes in your balance. Upto 24 items per page.

- page (optional): page number

### moneyWithdrawal(amount, withdrawal_method) | [doc ref](https://bitskins.com/api#request_withdrawal)
Allows you to request withdrawal of available balance on your BitSkins account. All withdrawals are finalized 15 days after this request on a rolling basis.

- amount: amount in USD to withdraw, must be at most equal to available balance
and it must be over $5.00 USD
- withdrawal_method: either `bitcoin`, `paypal` or `bank wire`

### buyItem(ids[, prices]) | [doc ref](https://bitskins.com/api#buy_item)
Allows you to buy the item currently on sale on BitSkins. Item must not be currently be on sale to you. Requires 2FA (Secure Purchases) to be enabled on your account if not logged in.

There are two ways to pass parameters to this method:

1) Pass an array of item ids and prices seperately where each index of one
array corresponds to the index of the other:

    `buyItem([ id1, id2 ], [ price1, price2 ])`

2) Pass a singular object where each id corresponds to the price

    `buyItem({ id1: price1, id2: price2 })`

I would recommend referring to the [official documentation](https://bitskins.com/api#buy_item)
to confirm the formatting.

### sellItem(ids[, prices]) | [doc ref](https://bitskins.com/api#list_item_for_sale)
Allows you to retrieve basic price data for items currently on sale at BitSkins.

Refer to the `buyItem` reference above to see how to see the two different
ways to format the parameters.

### modifySale(ids[, prices]) | [doc ref](https://bitskins.com/api#modify_sale_item)
Allows you to change the price on an item currently on sale.

Refer to the `buyItem` reference above to see how to see the two different
ways to format the parameters.

### withdrawItem(item_ids) | [doc ref](https://bitskins.com/api#withdraw_item)
Allows you to delist an active sale item and/or re-attempt an item pending withdrawal.

- item_ids: an array of the ids belonging to the items you want to withdraw

### bumpItem(item_ids) | [ doc ref](https://bitskins.com/api#bump_item)
Allows you to bump items higher for $0.75. Must have 2FA enabled if not logged in.

- item_ids: an array of the ids belonging to the items you want to bump

### getBuyHistory([page]) | [doc ref](https://bitskins.com/api#get_buy_history)
Allows you to retrieve your history of bought items on BitSkins. Defaults to 24 items per page, with most recent appearing first.

- page (optional): page number

### getSellHistory([page]) | [doc ref](https://bitskins.com/api#get_sell_history)
Allows you to retrieve your history of sold items on BitSkins. Defaults to 24 items per page, with most recent appearing first.

- page (optional): page number

### getItemHistory([page]) | [doc ref](https://bitskins.com/api#get_item_history)
Allows you to retrieve bought/sold/listed item history. Upto 24 items per page.

- page (optional): page number

### getTradeDetails(trade_token, trade_id) | [doc ref](https://bitskins.com/api#get_trade_details)
Allows you to retrieve information about items requested/sent in a given trade from BitSkins. Trade details will be unretrievable 7 days after the initiation of the trade.

- trade_token: the trade token in the message of the Steam trade offer
- trade_id the trade ID in the message of the Steam trade offer

### getRecentSaleInfo(market_hash_name[, page]) | [doc ref](https://bitskins.com/api#get_sales_info)
Allows you to retrieve upto 5 pages worth of recent sale data for a given item name. These are the recent sales for the given item at BitSkins, in descending order.

- market_hash_name: the name of the item you want to receive information about
- page (optional): page number

### getRawPriceData(market_hash_name) | [doc ref](https://bitskins.com/api#get_steam_price_data)
Allows you to retrieve raw Steam Community Market price data for a given item.
You can use this data to create your own pricing algorithm if you need it.

- market_hash_name: item to get price data for

## Web Sockets

To use the Bitskins web sockets, you need to initiate the Bitskins Web Socket
class, no api key or Bitskins secret is necessary.

For more information, visit the [Bitskins Web Socket docs](https://bitskins.com/websockets).

```javascript
socket.on('connected', () => {
    // will now be able to listen for all other events
})

socket.on('disconnected', () => {
    // no longer able to listen to all other events
})
```

The way to listen to an event is set an event listener for `channel:event`,
currently there is only one channel to listen to events on.

```javascript
socket.on('inventory_changes:listed', (item) => {
    console.log(item)
})
```

| channel | event | description |
| ------- | ----- | ----------- |
| inventory_changes | listed | This event is fired whenever a new (purchasable) item is listed at BitSkins. |
| inventory_changes | delisted_or_sold | This event is fired whenever an item is no longer available for sale at BitSkins. |
| inventory_changes | price_changed | This event is fired whenever an item's price is changed by the seller. |
| inventory_changes | extra_info | This event is fired whenever we retrieve an item's extra information from Steam (such as floats, stickers, etc.). |
