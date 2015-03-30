var request = require('request'),
    getUrl  = require('../lib/nasne_json_url.js');

module.exports = function(Nasne) {
  Nasne.prototype.getChannelList = function(broadcastingType, callback) {
    if (!broadcastingType) {
      throw new Error('broadcastingType not defined');
    }
    if (!callback || typeof (callback) !== 'function') {
      throw new Error('callback not defined');
    }
    var requestUrl = getUrl({
      hostname: this._ip,
      pathname: '/status/channelListGet',
      query: {
        'broadcastingType': broadcastingType
      }
    });
    request({
      url: requestUrl,
      json: true
      },
      function(error, response, body) {
        if (error) {
          throw error;
        }
        if (response.statusCode != 200) {
          throw new Error('HTTP : ' + response.statusCode);
        }
        if (callback) {
          callback(body.channel);
        }
      });
  };
  Nasne.BroadcastingType = {
    DTTV: 2,
    BS: 3,
    CS: 4
  };
};