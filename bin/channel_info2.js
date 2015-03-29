var request = require('request'),
    getUrl  = require('../lib/nasne_json_url.js');

module.exports = function(Nasne) {
  Nasne.prototype.getChannelInfo2 = function(tuningInfo, callback) {
    if (!tuningInfo) {
      throw new Error('tuning info not defined');
    }
    if (!tuningInfo.networkId) {
      throw new Error('network id not defined');
    }
    if (!tuningInfo.transportStreamId) {
      throw new Error('transport stream id not defined');
    }
    if (!tuningInfo.serviceId) {
      throw new Error('service id not defined');
    }
    if (!callback || typeof (callback) !== 'function') {
      throw new Error('callback not defined');
    }
    var withDescriptionLong = 1;

    var requestUrl = getUrl({
      hostname: this._ip,
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
};
