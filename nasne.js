var request = require('request'),
    url     = require('url');
    Q       = require('q');

const NASNE_API_URL = {
  protocol: 'http:',
  port:     64210
};

var DefaultOptions = {
  additional_hdd: false
};

var Nasne = function(ip, args) {
  if (!ip) {
    throw new Error('IP not defined');
  }
  var args = args || {};
  var options = DefaultOptions;
  this.options = {};
  for (var key in args) {
    options[key] = args[key];
  }
  for (var key in options) {
    this.options[key] = options[key];
  }
};

var getUrlObject = function(args) {
  var args = args || {};
  var result = NASNE_API_URL;
  for (var key in args) {
    result[key] = args[key];
  }
  return result;
}

Nasne.prototype = {
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
    var requestUrl = url.format(getUrlObject({
      hostname: this.options['ip'],
      pathname: '/status/HDDInfoGet',
      query: {'id': hddId}
    }));
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
}

module.exports = Nasne;
