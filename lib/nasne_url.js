var url = require('url');

const NASNE_API_URL = {
  protocol: 'http:',
  port:     64210
};

var getUrlObject = function(args) {
  var args = args || {};
  var result = NASNE_API_URL;
  for (var key in args) {
    result[key] = args[key];
  }
  return result;
};

module.exports = function(args) {
  return url.format(getUrlObject(args));
};