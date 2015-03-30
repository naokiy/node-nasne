var request = require('request'),
    getUrl  = require('../lib/nasne_json_url.js');

module.exports = function(Nasne) {
  Nasne.prototype.getHDDList = function(callback) {
    if (!callback || typeof (callback) !== 'function') {
      throw new Error('callback not defined');
    }
    var requestUrl = getUrl({
      hostname: this._ip,
      pathname: '/status/HDDListGet'
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
        callback(body);
      }
    });
  };
  Nasne.BroadcastingType = {
    DTTV: 2,
    BS: 3,
    CS: 4
  };
};