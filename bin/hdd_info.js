var request = require('request'),
    Q       = require('q'),
    getUrl  = require('../lib/nasne_url.js');

var HddInfo = function(ip, options) {
  this.ip = ip;
  this.options = options;
};

HddInfo.prototype = {
  getHddInfo: function(callback) {
    if (!callback || typeof(callback) !== 'function') {
      throw new Error('callback not defined');
    }
    var hddIds = (this.options['additional_hdd']? [0,1]: [0]);
    Q.all(hddIds.map(this._deferredGetHddInfoByHddId.bind(this))).then(callback);
  },
  _deferredGetHddInfoByHddId: function(hddId) {
    var d = Q.defer();
    this.getHddInfoByHddId(hddId, function(info) {d.resolve(info);});
    return d.promise;
  },
  getHddInfoByHddId: function(hddId, callback) {
    if (!callback || typeof(callback) !== 'function') {
      throw new Error('callback not defined');
    }

    var requestUrl = getUrl({
      hostname: this.ip,
      pathname: '/status/HDDInfoGet',
      query: {'id': hddId}
    });

    request({
      url: requestUrl,
      json: true
      },
      function(error, response, body) {
        if (!error && response.statusCode == 200) {
          if (callback) {
            callback(body.HDD);
          }
        }
      });
  },
  getHddVolumeSize: function(callback) {
    if (!callback || typeof(callback) !== 'function') {
      throw new Error('callback not defined');
    }
    this.getHddInfo(function(hddInfo) {
      var free, used, total;
      free = hddInfo.reduce(function(prev, current) {
        return prev + current.freeVolumeSize;
      }, 0);
      used = hddInfo.reduce(function(prev, current) {
        return prev + current.usedVolumeSize;
      }, 0);
      total = hddInfo.reduce(function(prev, current) {
        return prev + current.totalVolumeSize;
      }, 0);
      callback({'free': free, 'used': used, 'total': total});
    });
  }
};

module.exports = HddInfo;