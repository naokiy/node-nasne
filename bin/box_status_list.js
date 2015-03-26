var request = require('request'),
    getUrl  = require('../lib/nasne_url.js');

var BoxStatusList = function(ip, options) {
  this.ip = ip;
  this.options = options;
};

BoxStatusList.prototype = {
  get: function(callback) {
    var requestUrl = getUrl({
      hostname: this.ip,
      pathname: '/status/boxStatusListGet'
    });
    request({
      url: requestUrl,
      json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (callback) {
            callback(body);
          }
        }
      });
  }
};

module.exports = BoxStatusList;