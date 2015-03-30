var request = require('request'),
    _       = require('lodash'),
    Promise = require('bluebird'),
    getUrl  = require('../lib/nasne_json_url.js');

module.exports = function(Nasne) {
  Nasne.prototype.getHDDVolumeSize = function(callback) {
    var self = this;

    var getHDDListAsync = function() {
      return new Promise(function(resolve, reject) {
        self.getHDDList(function(data) {
          resolve(data);
        });
      });
    };

    var getHDDInfoAsync = function(id) {
      return new Promise(function(resolve, reject) {
        self.getHDDInfo(id, function(data) {
          resolve(data);
        });
      });
    };

    getHDDListAsync()
    .then(function(data) {
      return _.pluck(_.filter(data.HDD, {"registerFlag": 1}), 'id');
    })
    .map(getHDDInfoAsync)
    .reduce(function(total, data) {
      total.free += data.HDD.freeVolumeSize;
      total.used += data.HDD.usedVolumeSize;
      total.total += data.HDD.totalVolumeSize;
      return total;
    }, {free: 0, used: 0, total: 0})
    .then(callback);
  };
};