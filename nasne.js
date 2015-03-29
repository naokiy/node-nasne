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
  this._ip = ip;
  this._options = options;
};

require('./bin/box_status_list.js')(Nasne);
require('./bin/channel_list.js')(Nasne);
require('./bin/channel_info2.js')(Nasne);
require('./bin/hdd_info.js')(Nasne);
require('./bin/reserved_list.js')(Nasne);

module.exports = Nasne;
