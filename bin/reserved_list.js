var request = require('request'),
    getUrl  = require('../lib/nasne_json_url.js');

var defaultOptions = {
  searchCriteria: 0,
  filter: 0,
  startingIndex: 0,
  requestedCount: 0,
  sortCriteria: 0,
  withDescriptionLong: 1,
  withUserData: 0
};

module.exports = function(Nasne) {
  Nasne.prototype.getReservedList = function(options, callback) {
    if (typeof options == 'function') {
      callback = options;
      options = {};
    }
    if (!callback || typeof (callback) !== 'function') {
      throw new Error('callback not defined');
    }
    var requestUrl = getUrl({
      hostname: this._ip,
      pathname: '/schedule/reservedListGet',
      query: defaultOptions
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
};