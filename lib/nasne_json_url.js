var url = require('url'),
    _   = require('lodash');

const NASNE_JSON_API_URL = {
  protocol: 'http:'
};

const NASNE_JSON_PORT = {
  'status': 64210,
  'schedule': 64220
}

var getJsonUrlObject = function(args) {
  var result = _.defaults(args || {}, NASNE_JSON_API_URL);
  var jsonType;
  if (!result.port && result.pathname) {
    jsonType = result.pathname.split('/')[1];
    if (NASNE_JSON_PORT[jsonType]) {
      result.port = NASNE_JSON_PORT[jsonType];
    }
  }
  return result;
};

module.exports = function(args) {
  return url.format(getJsonUrlObject(args));
};