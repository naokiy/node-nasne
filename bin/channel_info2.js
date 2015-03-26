var request = require('request'),
    getUrl  = require('../lib/nasne_url.js');

var ChannelInfo2 = function(ip, options) {
  this.ip = ip;
  this.options = options;
};

ChannelInfo2.prototype = {
  get: function(tuningInfo, callback) {
    if (!tuningInfo) {
      throw new Error('tuning info is needed');
    }
    if (!tuningInfo.networkId) {
      throw new Error('network id is needed');
    }
    if (!tuningInfo.transportStreamId) {
      throw new Error('transport stream id is needed');
    }
    if (!tuningInfo.serviceId) {
      throw new Error('service id is needed');
    }
    if (!callback || typeof (callback) !== 'function') {
      throw new Error('callback not defined');
    }
    var withDescriptionLong = 1;

    var requestUrl = getUrl({
      hostname: this.ip,
      pathname: '/status/channelInfoGet2',
      query: {
        'serviceId': tuningInfo.serviceId,
        'transportStreamId': tuningInfo.transportStreamId,
        'networkId': tuningInfo.networkId,
        'withDescriptionLong': withDescriptionLong
      }
    });
    request({
      url: requestUrl,
      json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (callback) {
            callback(body.channel);
          }
        }
      });
  }
};

module.exports = ChannelInfo2;
