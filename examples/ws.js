const Bitskins = require('../index');

const socket = new Bitskins.WebSocket();

socket.on('connected', () => {
  console.log('connecting, listening for events');
})

socket.on('disconnected', () => {
  console.log('disconnected, no longer listening for events');
})

socket.on('inventory_changes:listed', (item) => {
  console.log('new item listed', item);
  /*
   * {
   *   app_id: "730",
   *   context_id: "2",
   *   item_id: "10564380327",
   *   class_id: "310779000",
   *   instance_id: "302028390",
   *   image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgpot621FBRw7P7NYjV9-N24q42Ok_7hPvXXlGkBsJ1z2b6Rp9302gLm-Uo-am2lItXBegFraV7T-FHtkOq-1sW8ot2Xnl-RcvNU/257fx257f",
   *   market_hash_name: "AWP | Safari Mesh (Well-Worn)",
   *   price: "9999.0",
   *   discount: "0",
   *   event_type: "listed"
   * }
   */
})

socket.on('inventory_changes:delisted_or_sold', (item) => {
  console.log('item delisted/sold', item);
  /*
   * {
   *   app_id: "730",
   *   context_id: "2",
   *   item_id: "10533395690",
   *   instance_id: "143865972",
   *   classid: "2209624701",
   *   market_hash_name: "Spectrum Case Key",
   *   price: "5.00",
   *   event_type: "delisted_or_sold"
   * }
   */
})

socket.on('inventory_changes:price_changed', (item) => {
  console.log('item price changed by seller', item);
  /*
   * {
   *   app_id: "730",
   *   context_id: "2",
   *   item_id: "10562415731",
   *   class_id: "937253442",
   *   instance_id: "188530170",
   *   market_hash_name: "StatTrak™ Desert Eagle | Bronze Deco (Factory New)",
   *   image: "https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXH5ApeO4YmlhxYQknCRvCo04DEVlxkKgposr-kLAtl7PLFTj9Q49Kskb-Yh_bmOLfUqWdY781lxL2T8Y-kjAa2qhZlNmz7ItCSd1I4ZVrVrFi6kO_mgJa9uJXAyHdguXI8pSGKoKTrgPA/257fx257f",
   *   price: "1.06",
   *   discount: "25",
   *   event_type: "price_changed"
   * }
   */
})

socket.on('inventory_changes:extra_info', (info) => {
  console.log('extra info retrieved', info);
  /*
   * {
   *   app_id: "730",
   *   context_id: "2",
   *   item_id: "10564224485",
   *   extra_info: {
   *     paintindex: 17,
   *     paintseed: 232,
   *     rarity: 2,
   *     quality: 4,
   *     paintwear: 1034404719
   *   },
   *   wear_value: "0.0819157287478447",
   *   sticker_info: [{
   *     name: "The Fragger",
   *     url: "https://steamcdn-a.akamaihd.net/apps/730/icons/econ/stickers/team_roles_capsule/fragger.a050472b439906b916c5926a3383f12290c2c1b9.png",
   *     wear_value: "0.0"
   *   }],
   *   event_type: "extra_info"
   * }
   */
});
