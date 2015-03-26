var HddInfo = require('./bin/hdd_info.js'),
    ChannelInfo2 = require('./bin/channel_info2.js'),
    BoxStatusList = require('./bin/box_status_list.js');

var DefaultOptions = {
  additional_hdd: false
};

var Nasne = function(ip, args) {
  if (!ip) {
    throw new Error('IP not defined');
  }
  var args = args || {};
  var options = DefaultOptions;
  for (var key in args) {
    options[key] = args[key];
  }
  this._hddInfo = new HddInfo(ip, options);
  this._channelInfo2 = new ChannelInfo2(ip, options);
  this._boxStatusList = new BoxStatusList(ip, options);
};

Nasne.prototype = {
  getHddInfo: function(callback) {
    this._hddInfo.getHddInfo(callback);
  },
  getHddInfoByHddId: function(hddId, callback) {
    this._hddInfo.getHddInfoByHddId(hddId, callback);
  },
  getHddVolumeSize: function(callback) {
    this._hddInfo.getHddVolumeSize(callback);
  },
  getChannelInfo2: function(tuningInfo, callback) {
    this._channelInfo2.get(tuningInfo, callback);
  },
  getBoxStatusList: function(callback) {
    this._boxStatusList.get(callback);
  }
}

module.exports = Nasne;
