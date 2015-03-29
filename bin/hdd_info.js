var request = require('request'),
    Q       = require('q'),
    getUrl  = require('../lib/nasne_json_url.js');

var deferredGetHddInfoByHddId = function(hddId) {
  var d = Q.defer();
  this.getHddInfoByHddId(hddId, function(info) {d.resolve(info);});
  return d.promise;
};

module.exports = function(Nasne) {
  Nasne.prototype.getHddInfo = function(callback) {
    if (!callback || typeof(callback) !== 'function') {
      throw new Error('callback not defined');
    }
    var hddIds = (this._options['additional_hdd']? [0,1]: [0]);
    Q.all(hddIds.map(deferredGetHddInfoByHddId.bind(this))).then(callback);
  };

  Nasne.prototype.getHddInfoByHddId = function(hddId, callback) {
    if (!callback || typeof(callback) !== 'function') {
      throw new Error('callback not defined');
    }

    var requestUrl = getUrl({
      hostname: this._ip,
      pathname: '/status/HDDInfoGet',
      query: {'id': hddId}
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
          callback(body.HDD);
        }
      });
  };

  Nasne.prototype.getHddVolumeSize = function(callback) {
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
  };
};