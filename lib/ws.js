const Pusher = require('pusher-client');

class WebSocket {

  constructor() {
    this.pusher = new Pusher('c0eef4118084f8164bec65e6253bf195', {
      encrypted: true,
      wsPort: 443,
      wssPort: 443,
      host: 'notifier.bitskins.com'
    });

    this.channels = {};
  }

  on(eventName, callback) {
    if (eventName === 'connected') {
      this.pusher.connection.bind('connected', callback);
      return;
    }

    if (eventName === 'disconnected') {
      this.pusher.connection.bind('disconnected', callback);
      return;
    }

    if (!eventName.includes(':') || eventName.split(':').length !== 2) {
      throw new Error('Bitskins WS: event names need to be in the format `channel:event`');
    }

    const [channel, event] = eventName.split(':');
    if (!Object.prototype.hasOwnProperty.call(this.channels, channel)) {
      this.channels[channel] = this.pusher.subscribe(channel);
    }

    this.channels[channel].bind(event, callback);
  }

}

module.exports = WebSocket;