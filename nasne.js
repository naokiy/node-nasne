var _ = require('lodash');

var defaultOptions = {
  additional_hdd: false
};

var Nasne = function(ip, args) {
  if (!ip) {
    throw new Error('IP not defined');
  }
  this._options = _.defaults(args || {}, defaultOptions);
  this._ip = ip;
};

require('./bin/box_status_list.js')(Nasne);
require('./bin/channel_list.js')(Nasne);
require('./bin/channel_info2.js')(Nasne);
require('./bin/hdd_info.js')(Nasne);
require('./bin/reserved_list.js')(Nasne);

module.exports = Nasne;
